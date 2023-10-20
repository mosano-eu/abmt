import {
  IStorageProvider,
  IContextProvider,
  IStoredMigrationReference,
} from '@abmt/core';
import { Sequelize, Model } from 'sequelize';
import { MongooseORMContext } from './typings';
import { MigrationModel, getMigrationModel } from './model';
import cloneDeep from 'lodash/cloneDeep';

type MongooseORMOptions = {
  sequelize: Sequelize;
  modelName?: string;
};

export class MongooseORM
  implements IStorageProvider, IContextProvider<MongooseORMContext>
{
  private sequelize: Sequelize;
  private model: MigrationModel;

  constructor({ sequelize, modelName }: MongooseORMOptions) {
    this.sequelize = sequelize;
    this.model = getMigrationModel(sequelize, modelName || 'migrations');
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
