import { IMigrationsProviderAdapter, Migration } from '@abmf/core';
import {
  matchAndGetMigrationsFromMigrationsPath,
  resolveMigrationsPath,
} from './fs';

type FSMigrationProviderAdapterOptions = {
  migrationsPath: string;
  migrationsPattern?: RegExp;
};

const defaultMigrationsPattern = /.+\.(js|ts|cjs|mjs)/;

export class FSMigrationProviderAdapter<Context>
  implements IMigrationsProviderAdapter<Context>
{
  readonly migrationsPath: string;
  private migrations = new Map<string, Migration<Context>>();

  constructor({
    migrationsPath,
    migrationsPattern = defaultMigrationsPattern,
  }: FSMigrationProviderAdapterOptions) {
    this.migrationsPath = resolveMigrationsPath(migrationsPath);

    for (const migration of matchAndGetMigrationsFromMigrationsPath(
      this.migrationsPath,
      migrationsPattern,
    )) {
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
