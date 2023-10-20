import {
  IStorageProvider,
  IContextProvider,
  IStoredMigrationReference,
} from '@abmf/core';
import { Connection, Model } from 'mongoose';
import { MongooseORMContext } from './typings';
import { getMigrationModel } from './model';
import cloneDeep from 'lodash/cloneDeep';

type MongooseORMOptions = {
  connection: Connection;
  collectionName?: string;
};

export class MongooseORM
  implements IStorageProvider, IContextProvider<MongooseORMContext>
{
  private connection: Connection;
  private model: Model<IStoredMigrationReference>;

  constructor({ connection, collectionName }: MongooseORMOptions) {
    this.connection = connection;
    this.model = getMigrationModel(connection, collectionName || 'migrations');
  }

  ///
  // Public methods
  ///

  async upsertReferences(
    refs: Array<
      Pick<IStoredMigrationReference, 'id'> & Partial<IStoredMigrationReference>
    >,
  ): Promise<void> {
    await this.model.bulkWrite(
      refs.map((ref) => ({
        updateOne: {
          filter: {
            id: { $eq: ref.id },
          },
          update: { $set: cloneDeep(ref) },
          upsert: true,
        },
      })),
    );
  }

  async getStoredMigrationReferences() {
    const refs: IStoredMigrationReference[] = [];
    const iterator = this.model.find({});

    for await (const doc of iterator) {
      refs.push({
        id: doc.id,
        name: doc.name,
        created_at: doc.created_at,
        last_applied: doc.last_applied && {
          at: doc.last_applied.at,
          direction: doc.last_applied.direction,
        },
      });
    }

    return refs;
  }

  async getContext(): Promise<MongooseORMContext> {
    return {
      mongoose: {
        connection: await this.connection.asPromise(),
      },
    };
  }
}
