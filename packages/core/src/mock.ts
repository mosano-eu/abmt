import { Migrator } from './migrator';
import { Migration, MigrationOptions } from './migration';
import {
  IStorageProvider,
  IStoredMigrationReference,
} from './storage-provider';
import { IMigrationsProvider } from './migrations-provider';
import { IContextProvider } from './context-provider';

export function createMockStorageProvider() {
  const storedMigrationsMap = new Map<string, IStoredMigrationReference>();

  const storageProvider: IStorageProvider = {
    getStoredMigrationReferences() {
      return [...storedMigrationsMap.values()];
    },
    upsertReferences(refs) {
      for (const ref of refs) {
        const existing = storedMigrationsMap.get(ref.id);

        storedMigrationsMap.set(ref.id, {
          id: ref.id || existing?.id || '',
          name: ref.name || existing?.name || '',
          created_at: ref.created_at || existing?.created_at || new Date(0),
          last_applied: ref.last_applied || undefined,
        });
      }
    },
  };

  return storageProvider;
}

export function createMockMigrationsProvider<Context>(
  migrationsOpts: MigrationOptions<Context>[],
) {
  const migrationsMap = new Map(
    migrationsOpts
      .map((opts) => new Migration(opts))
      .map((migration) => [migration.id, migration]),
  );

  const migrationsProvider: IMigrationsProvider<Context> = {
    getAllMigrations() {
      return [...migrationsMap.values()];
    },
    getMigration(id) {
      return migrationsMap.get(id);
    },
  };

  return migrationsProvider;
}

export function buildMockedSetup<Context>(
  migrationsOpts: MigrationOptions<Context>[],
  getContext: IContextProvider<Context>['getContext'],
) {
  const migrationsProvider = createMockMigrationsProvider(migrationsOpts);
  const storageProvider = createMockStorageProvider();

  const migrator = new Migrator({
    migrationsProvider,
    storageProvider,
    getContext,
  });

  return {
    migrator,
    migrationsProvider,
    storageProvider,
  };
}
