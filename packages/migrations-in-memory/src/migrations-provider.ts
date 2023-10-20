import { IMigrationsProvider, Migration } from '@abmt/core';

type InMemoryMigrationsProviderOptions<Context> = {
  migrations: Migration<Context>[];
};

export class InMemoryMigrationsProvider<Context>
  implements IMigrationsProvider<Context>
{
  readonly migrationsPath: string;
  private migrations = new Map<string, Migration<Context>>();

  constructor({ migrations }: InMemoryMigrationsProviderOptions<Context>) {
    for (const migration of migrations) {
      this.migrations.set(migration.id, migration);
    }
  }

  ///
  // Public methods
  ///

  async getAllMigrations(): Promise<Migration<Context>[]> {
    return [...this.migrations.values()];
  }

  async getMigration(id: string): Promise<Migration<Context>> {
    const migration = this.migrations.get(id);

    if (!migration) {
      throw new Error('Migration not found');
    }

    return migration;
  }
}
