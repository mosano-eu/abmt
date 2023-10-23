import { Sequelize, DataTypes, Model, ModelDefined } from 'sequelize';
import { MigrationDirection } from '@abmt/core';

export type MigrationModelAttrinutes = {
  id: string;
  name: string;
  created_at: Date;
  last_applied_at?: Date;
  last_applied_direction?: MigrationDirection;
};

export type MigrationModel = ModelDefined<
  MigrationModelAttrinutes,
  MigrationModelAttrinutes
>;

export function getMigrationModel(
  sequelize: Sequelize,
  modelName: string,
): MigrationModel {
  // class Migrations extends Model<MigrationModelAttrinutes> {}

  // Migrations.init(
  //   {
  //     id: {
  //       type: DataTypes.STRING,
  //     },
  //     name: {
  //       type: DataTypes.STRING,
  //     },
  //     created_at: {
  //       type: DataTypes.DATE,
  //     },
  //     last_applied_at: {
  //       type: DataTypes.DATE,
  //     },
  //     last_applied_direction: {
  //       type: DataTypes.STRING,
  //       values: Object.values(MigrationDirection),
  //     },
  //   },
  //   { sequelize, modelName },
  // );

  const MigrationsModel = sequelize.define<Model<MigrationModelAttrinutes>>(
    modelName,
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      created_at: {
        type: DataTypes.DATE,
      },
      last_applied_at: {
        type: DataTypes.DATE,
      },
      last_applied_direction: {
        type: DataTypes.STRING,
        values: Object.values(MigrationDirection),
      },
    },
  );

  return MigrationsModel;
}
