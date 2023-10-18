import { IMigrationMetadata, MigrationDirection } from './migration';
import { SyncOrAsync } from './typings';

export interface IStoredMigrationReference
  extends Pick<IMigrationMetadata, 'id' | 'name' | 'created_at'> {
  last_applied?: {
    direction: MigrationDirection;
    at: Date;
  };
}

export interface IStorageProvider {
  upsertReferences(
    ref: Array<
      Pick<IStoredMigrationReference, 'id'> & Partial<IStoredMigrationReference>
    >,
  ): SyncOrAsync<void>;
  getStoredMigrationReferences(): SyncOrAsync<IStoredMigrationReference[]>;
}

export interface IContextProvider<Context> {
  getContext(): SyncOrAsync<Context>;
}
