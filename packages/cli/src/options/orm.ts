import { IContextProvider, IStorageProvider } from '@abmf/core';
import { Command, Option, createOption } from 'commander';
import flatten from 'lodash/flatten';
import { MigrationType } from '../typings';

export enum PlatformKey {
  Mongoose = 'mongoose',
}

export function getOrmOptions(migrationType: MigrationType): Option[] {
  const ormOption = createOption('-o, --orm <orm>')
    .choices(['mongoose'])
    .default('mongoose')
    .makeOptionMandatory(true);

  const optionsByPlatform: Record<PlatformKey, Option[]> = {
    [PlatformKey.Mongoose]: [
      createOption('--mongoose-uri <mongooseUri>')
        .implies({ orm: 'mongoose' })
        .env('MONGOOSE_URI'),
      createOption(
        '--mongoose-migrations-collection <mongooseMigrationsCollection>',
      )
        .implies({ orm: 'mongoose' })
        .default(
          (migrationType === MigrationType.Seeds && 'abmf_seeds') ||
            'abmf_migrations',
        )
        .env(
          (migrationType === MigrationType.Seeds &&
            'MONGOOSE_SEEDS_COLLECTION') ||
            'MONGOOSE_MIGRATIONS_COLLECTION',
        ),
    ],
  };

  return flatten([ormOption, ...Object.values(optionsByPlatform)]);
}

export function getPlatformClient<Context>(
  cmd: Command,
  orm: PlatformKey,
): {
  storageAdapter: IStorageProvider;
  contextAdapter: IContextProvider<Context>;
} {
  const options = cmd.optsWithGlobals();

  switch (orm) {
    case PlatformKey.Mongoose: {
      const { MongooseORM } = require('@abmf/orm-mongoose');
      const { createConnection } = require('mongoose');

      const connection = createConnection(options.mongooseUri);
      const orm = new MongooseORM({
        connection,
        collection: options.mongooseMigrationsCollection,
      });

      return {
        storageAdapter: orm,
        contextAdapter: orm,
      };
    }

    default:
      throw new Error('ORM adapter not found');
  }
}
