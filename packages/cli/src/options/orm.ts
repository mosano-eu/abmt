import { IContextProvider, IStorageProvider } from '@abmf/core';
import { Command, Option, createOption } from 'commander';
import flatten from 'lodash/flatten';
import { MigrationType } from '../typings';
import { notifyOnTerminal } from '../utils/cli';

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

export async function getORMProviders<Context>(cmd: Command): Promise<{
  storageProvider: IStorageProvider;
  contextProvider: IContextProvider<Context>;
}> {
  const options = cmd.optsWithGlobals();

  switch (options.orm) {
    case PlatformKey.Mongoose: {
      const { MongooseORM } = require('@abmf/orm-mongoose');
      const { createConnection } = require('mongoose');

      const connection = createConnection(options.mongooseUri);
      const orm = new MongooseORM({
        connection,
        collection: options.mongooseMigrationsCollection,
      });

      // handle hooks
      // wait for the connection to be established
      await notifyOnTerminal('Connecting to MongoDB', () =>
        connection.asPromise(),
      );

      cmd.hook('postAction', async () => {
        await notifyOnTerminal('Closing MongoDB connection', () =>
          connection.close(),
        );
      });

      return {
        storageProvider: orm,
        contextProvider: orm,
      };
    }

    default:
      throw new Error('ORM adapter not found');
  }
}
