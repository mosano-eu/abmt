import {
  IStorageProvider,
  IContextProvider,
  IStoredMigrationReference,
} from '@abmt/core';
import { Sequelize } from 'sequelize';
import { SequelizeORMContext } from './typings';
import { MigrationModel, getMigrationModel } from './model';
import mem from 'mem';

type SequelizeORMOptions = {
  sequelize: Sequelize;
  modelName?: string;
};

export class SequelizeORM
  implements IStorageProvider, IContextProvider<SequelizeORMContext>
{
  private sequelize: Sequelize;
  private model: MigrationModel;

  constructor({ sequelize, modelName }: SequelizeORMOptions) {
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
    await this._syncModel();

    await this.model.bulkCreate(
      refs.map((ref) => ({
        id: ref.id,
        name: ref.name,
        created_at: ref.created_at,
        last_applied_at: ref.last_applied?.at,
        last_applied_direction: ref.last_applied?.direction,
      })),
      {
        updateOnDuplicate: ['last_applied_at', 'last_applied_direction'],
      },
    );
  }

  async getStoredMigrationReferences() {
    const refs: IStoredMigrationReference[] = [];

    for await (const doc of await this.model.findAll()) {
      const lastApplied =
        (doc.dataValues.last_applied_at &&
          doc.dataValues.last_applied_direction) ||
        undefined;

      refs.push({
        id: doc.dataValues.id,
        name: doc.dataValues.name,
        created_at: doc.dataValues.created_at,
        last_applied: lastApplied && {
          at: doc.dataValues.last_applied_at,
          direction: doc.dataValues.last_applied_direction,
        },
      });
    }

    return refs;
  }

  async getContext(): Promise<SequelizeORMContext> {
    return {
      sequelize: this.sequelize,
    };
  }

  ///
  // Private methods
  ///

  _syncModel = mem(async () => {
    await this.model.sync({
      force: false,
    });
  });
}
