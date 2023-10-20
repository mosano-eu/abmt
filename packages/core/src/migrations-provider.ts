import { IMigrationMetadata, Migration } from './migration';
import { SyncOrAsync } from './typings';

export interface IMigrationsProvider<Context> {
  getAllMigrations(): SyncOrAsync<Array<Migration<Context>>>;
  getMigration(id: IMigrationMetadata['id']): SyncOrAsync<Migration<Context>>;
}
