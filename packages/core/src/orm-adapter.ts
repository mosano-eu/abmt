import { MigrationDirection } from ".";

export interface IStoredMigrationReference {
  id: string;
  name: string;
  last_applied_direction?: MigrationDirection;
  last_applied_at?: Date;
}

export interface IORMAdapter {
  getStoredMigrationReferences(): Promise<IStoredMigrationReference[]>;
}
