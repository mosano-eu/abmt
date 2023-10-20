import { IContextProvider, IStorageProvider } from '@abmf/core';
import { Command, Option, createOption } from 'commander';
import { EventEmitter } from 'node:events';
import { notifyOnTerminal } from '../utils/cli';

export enum PlatformKey {
  Mongoose = 'mongoose',
}

const emitter = new EventEmitter();

export function setupCmdToOwnORM(cmd: Command) {
  ///
  // Handle options
  const options = [
    createOption('-o, --orm <orm>')
      .choices(['mongoose'])
      .default('mongoose')
      .makeOptionMandatory(true),

    // PlatformKey.Mongoose
    createOption('--mongoose-uri <mongooseUri>')
      .default('mongodb://127.0.0.1:27017/abmf')
      .implies({ orm: 'mongoose' })
      .env('MONGOOSE_URI'),

    createOption(
      '--mongoose-migrations-collection <mongooseMigrationsCollection>',
    )
      .implies({ orm: 'mongoose' })
      .default('abmf_migrations')
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

      emitter.once('post-action', () => {
        // action might not enter a new line
        process.stdout.write('\n');

        notifyOnTerminal('Closing MongoDB connection', () =>
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
