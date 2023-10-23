import { IContextProvider, IStorageProvider } from '@abmt/core';
import { Command, createOption } from 'commander';
import { EventEmitter } from 'node:events';
import { notifyOnTerminal } from '../utils/cli';

export enum PlatformKey {
  Mongoose = 'mongoose',
  Sequelize = 'sequelize',
}

const emitter = new EventEmitter();

export function setupCmdToOwnORM(cmd: Command) {
  ///
  // Handle options
  const options = [
    createOption('-o, --orm <orm>')
      .choices(Object.values(PlatformKey))
      .default('mongoose')
      .makeOptionMandatory(true),

    // PlatformKey.Sequelize
    createOption('--sequelize-uri <sequelizeUri>')
      .default('sqlite::memory:')
      .implies({ orm: PlatformKey.Mongoose })
      .env('SEQUELIZE_URI'),

    // PlatformKey.Mongoose
    createOption('--mongoose-uri <mongooseUri>')
      .default('mongodb://127.0.0.1:27017/abmt')
      .implies({ orm: PlatformKey.Mongoose })
      .env('MONGOOSE_URI'),

    createOption(
      '--mongoose-migrations-collection <mongooseMigrationsCollection>',
    )
      .implies({ orm: 'mongoose' })
      .default('abmt_migrations')
      .env('MONGOOSE_MIGRATIONS_COLLECTION'),
  ];

  for (const option of options) {
    cmd.addOption(option);
  }

  cmd.hook('preAction', () => {
    emitter.emit('pre-action');
  });
  cmd.hook('postAction', () => {
    emitter.emit('post-action');
  });
}

export async function getORMProviders<Context>(cmd: Command): Promise<{
  storageProvider: IStorageProvider;
  contextProvider: IContextProvider<Context>;
}> {
  const options = cmd.optsWithGlobals();

  switch (options.orm) {
    case PlatformKey.Sequelize: {
      const { SequelizeORM } = require('@abmt/orm-sequelize');
      const { Sequelize } = require('sequelize');

      const sequelize = new Sequelize(options.sequelizeUri);
      const orm = new SequelizeORM({
        sequelize,
        collection: options.mongooseMigrationsCollection,
      });

      // handle hooks
      // wait for the connection to be established
      await notifyOnTerminal(cmd, 'Connecting to orm', () => sequelize.sync());

      emitter.once('post-action', () => {
        sequelize.close();
      });

      return {
        storageProvider: orm,
        contextProvider: orm,
      };
    }

    case PlatformKey.Mongoose: {
      const { MongooseORM } = require('@abmt/orm-mongoose');
      const { createConnection } = require('mongoose');

      const connection = createConnection(options.mongooseUri);
      const orm = new MongooseORM({
        connection,
        collection: options.mongooseMigrationsCollection,
      });

      // handle hooks
      // wait for the connection to be established
      await notifyOnTerminal(cmd, 'Connecting to MongoDB', () =>
        connection.asPromise(),
      );

      emitter.once('post-action', () => {
        connection.close();
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
