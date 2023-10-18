import { IMigrationMetadata, Migration } from './migration';

export interface IMigrationsProviderAdapter<Context> {
  getAllMigrations(): Promise<Array<Migration<Context>>>;
  getMigration(id: IMigrationMetadata['id']): Promise<Migration<Context>>;
}
