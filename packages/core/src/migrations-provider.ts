import { IMigrationMetadata, Migration, MigrationDirection } from './migration';

export interface IMigrationsProviderAdapter<Context> {
  getAllMigrations(): Promise<Array<Migration<Context>>>;
  getMigration(id: IMigrationMetadata['id']): Promise<Migration<Context>>;
  executeMigration(
    id: IMigrationMetadata['id'],
    direction: MigrationDirection,
    context: Context,
  ): Promise<void>;
}
