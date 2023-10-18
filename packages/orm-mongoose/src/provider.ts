import {
  IStorageProvider,
  IContextProvider,
  IStoredMigrationReference,
} from '@abmf/core';
import { MongooseORMContext } from './typings';
import { Connection, Model } from 'mongoose';
import { getMigrationModel } from './model';

type MongooseORMProviderOptions = {
  connection: Connection;
  collectionName?: string;
};

export class MongooseORMProvider
  implements IStorageProvider, IContextProvider<MongooseORMContext>
{
  private connection: Connection;
  private model: Model<IStoredMigrationReference>;

  constructor({
    connection,
    collectionName = 'migrations',
  }: MongooseORMProviderOptions) {
    this.connection = connection;
    this.model = getMigrationModel(connection, collectionName);
  }

  async upsertReferences(
    refs: Pick<IStoredMigrationReference, 'id' | 'name' | 'created_at'>[],
  ): Promise<void> {
    await this.model.bulkWrite(
      refs.map((ref) => ({
        updateOne: {
          upsert: true,
          filter: {
            id: { $eq: ref.id },
          },
          update: ref,
        },
      })),
    );
  }

  async getStoredMigrationReferences(): Promise<IStoredMigrationReference[]> {
    const refs = await this.model.find().sort({ created_at: 'asc' }).lean(true);
    return refs;
  }

  async getContext(): Promise<MongooseORMContext> {
    return {
      mongoose: {
        connection: this.connection,
      },
    };
  }
}
