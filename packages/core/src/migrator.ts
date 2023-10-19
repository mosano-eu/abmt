import { IMigrationsProvider } from './migrations-provider';
import { IStorageProvider } from './orm';
import {
  Migration,
  MigrationDirection,
  MigrationIdentifier,
} from './migration';
import { SyncOrAsync } from './typings';
import { EventType, MigratorEvents } from './events';

export type MigratorOptions<Context> = {
  storageProvider: IStorageProvider;
  migrationsProvider: IMigrationsProvider<Context>;
  getContext: () => SyncOrAsync<Context>;
};

type ExecutionPlan = Array<{
  id: MigrationIdentifier;
  direction: MigrationDirection;
}>;

export class Migrator<Context> extends MigratorEvents {
  private migrationsProvider: IMigrationsProvider<Context>;
  private storageProvider: IStorageProvider;
  private getContext: MigratorOptions<Context>['getContext'];

  constructor(options: MigratorOptions<Context>) {
    super();

    this.storageProvider = options.storageProvider;
    this.migrationsProvider = options.migrationsProvider;
    this.getContext = options.getContext;
  }

  ///
  // Public methods
  ///

  async sync() {
    const migrations = await this.getAllMigrations();
    await this.syncWithStorage(migrations);
  }

  async goto(id?: MigrationIdentifier) {
    // get local migrations
    const migrations = await this.getAllMigrations();
    await this.syncWithStorage(migrations);

    const targetIndex = id
      ? migrations.findIndex((migration) => migration.id === id)
      : migrations.length - 1;
    if (targetIndex === -1) {
      throw new Error(MigrationError.UnableToDetermineATargetMigration);
    }

    // formulate an execution plan
    const executionPlan: ExecutionPlan = [];
    const migrationsAndStoredReferences =
      await this.getMigrationsStoredReferences(migrations);

    for (let index = 0; index < migrationsAndStoredReferences.length; index++) {
      const { migration, storedReference } =
        migrationsAndStoredReferences[index];
      const desiredDirection =
        index <= targetIndex ? MigrationDirection.UP : MigrationDirection.DOWN;

      if (storedReference.last_applied?.direction !== desiredDirection) {
        // add to the plan
        executionPlan.push({
          id: migration.id,
          direction: desiredDirection,
        });
      }
    }

    return this.execute(executionPlan);
  }

  ///
  // Private methods
  ///

  private async getAllMigrations() {
    const migrations = await this.migrationsProvider.getAllMigrations();

    return [...migrations].sort((a, b) =>
      a.getMetadata().created_at > b.getMetadata().created_at ? 1 : 0,
    );
  }

  private async getMigrationsStoredReferences(
    migrations: Migration<Context>[],
  ) {
    const references =
      await this.storageProvider.getStoredMigrationReferences();

    return migrations.map((migration) => {
      // get stored references
      const storedReference = references.find((ref) => ref.id === migration.id);
      const metadata = migration.getMetadata();

      return { migration, metadata, storedReference };
    });
  }

  private async syncWithStorage(migrations: Migration<Context>[]) {
    // upsert all the local references on orm migrations ref storage
    await this.storageProvider.upsertReferences(
      migrations.map((migration) => migration.getMetadata()),
    );
  }

  private async execute(executionPlan: ExecutionPlan) {
    if (executionPlan.length === 0) return;

    const context = await this.getContext();

    // execute migrations
    for (const { id, direction } of executionPlan) {
      const migration = await this.migrationsProvider.getMigration(id);
      const metadata = migration.getMetadata();
      let error: Error | undefined = undefined;

      try {
        await migration[direction](context);

        // save to stored ref
        await this.storageProvider.upsertReferences([
          {
            id: metadata.id,
            name: metadata.name,
            created_at: metadata.created_at,
            last_applied: {
              direction,
              at: new Date(),
            },
          },
        ]);
      } catch (err) {
        error = err;

        this.emit(EventType.Error, error);
        this.log(
          `Migration ${id} had an error while executing: ${err.message}`,
          { err },
        );
        throw new Error('MigrationError');
      } finally {
        this.emit(EventType.MigrationDirectionExecuted, {
          successful: !error,
          error,
        });
      }
    }
  }

  private log(message: string, context?: unknown) {
    this.emit(EventType.Log, { message, context });
  }
}

export enum MigrationError {
  Unknown = 'Unknown error occured',
  MigrationExecutionError = 'An Error ocurred while executing a migration',
  UnableToDetermineATargetMigration = 'Unable to determine a target migration',
}
