import { Connection, Model, Schema } from 'mongoose';
import { IStoredMigrationReference } from '@abmf/core';

export function getMigrationModel(
  connection: Connection,
  collection: string,
): Model<IStoredMigrationReference> {
  const MigrationSchema = new Schema<IStoredMigrationReference>(
    {
      id: { type: String, unique: true },
      name: String,
      created_at: Date,
    },
    {
      collection,
      autoCreate: true,
    },
  );

  return connection.model<IStoredMigrationReference>(
    collection,
    MigrationSchema,
  );
}
