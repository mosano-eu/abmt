import { Connection, Model, Schema } from 'mongoose';
import { IStoredMigrationReference, MigrationDirection } from '@abmt/core';

export function getMigrationModel(
  connection: Connection,
  collection: string,
): Model<IStoredMigrationReference> {
  const MigrationSchema = new Schema<IStoredMigrationReference>(
    {
      id: { type: String, unique: true },
      name: String,
      created_at: Date,
      last_applied: {
        type: {
          direction: { type: String, enum: Object.values(MigrationDirection) },
          at: Date,
        },
        required: false,
      },
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
