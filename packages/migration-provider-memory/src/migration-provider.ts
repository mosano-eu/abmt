import { IMigrationsProviderAdapter, Migration } from '@abmf/core';

type MemoryMigrationProviderAdapterOptions<Context> = {
  migrations: Migration<Context>[];
};

export class MemoryMigrationProviderAdapter<Context>
  implements IMigrationsProviderAdapter<Context>
{
  readonly migrationsPath: string;
  private migrations = new Map<string, Migration<Context>>();

  constructor({ migrations }: MemoryMigrationProviderAdapterOptions<Context>) {
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
