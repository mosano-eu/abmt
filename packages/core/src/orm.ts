import { IMigrationMetadata, MigrationDirection } from './migration';

export interface IStoredMigrationReference
  extends Pick<IMigrationMetadata, 'id' | 'name' | 'created_at'> {
  last_applied?: {
    direction: MigrationDirection;
    at: Date;
  };
}

export interface IStorageProvider {
  upsertReferences(
    ref: Array<Pick<IStoredMigrationReference, 'id' | 'name' | 'created_at'>>,
  ): Promise<void>;
  getStoredMigrationReferences(): Promise<IStoredMigrationReference[]>;
}

export interface IContextProvider<Context> {
  getContext(): Promise<Context>;
}
