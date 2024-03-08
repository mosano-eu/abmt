import { Migrator } from '@abmt/core';
import { Command, createOption } from 'commander';
import { getORMProviders } from './orm';
import { getMigrationsProvider } from './migrations';

export function setupCmdToOwnMigrator(cmd: Command) {
  ///
  // Handle options
  const customMigratorPath = createOption(
    '--custom-migrator-path <customMigratorPath>',
    'relative or absolute path to a JS or TS file that exposes a migrator builder, either as `getMigrator` or as `default`',
  ).default('');

  cmd.addOption(customMigratorPath);
}

export async function getMigrator(cmd: Command) {
  const options = cmd.optsWithGlobals();

  if (options.customMigratorPath) {
    // Attempt to load the `getMigrator` from this file path
    try {
      // attempt to load the file
      const migratorModulePath = require.resolve(options.customMigratorPath, {
        paths: [process.cwd()],
      });

      const migratorModule = require(migratorModulePath);

      const getMigrator =
        (typeof migratorModule == 'function' && migratorModule) ||
        (typeof migratorModule.getMigrator == 'function' &&
          migratorModule.getMigrator) ||
        undefined;

      if (!getMigrator) {
        throw new Error(
          `Custom Migrator: Unable to find the 'getMigrator' function`,
        );
      }

      // attempt to execute it
      const migrator = await getMigrator();

      // if (!(migrator instanceof Migrator)) {
      //   throw new Error(
      //     "'getMigrator' function didn't return a valid Migrator instance",
      //   );
      // }

      // valid, lets use it
      return migrator;
    } catch (err) {
      throw new Error(
        `Custom Migrator: Unable to load migrator at "${options.migratorPath}". Please make sure the file exists and a "getMigrator" function is exported either as is or as the default exports.`,
        {
          cause: err,
        },
      );
    }
  }

  {
    return buildMigrator(cmd);
  }
}

async function buildMigrator(cmd: Command) {
  const { contextProvider, storageProvider } = await getORMProviders(cmd);
  const migrationsProvider = getMigrationsProvider(cmd);

  const migrator = new Migrator({
    migrationsProvider,
    storageProvider,
    getContext: () => contextProvider.getContext(),
  });

  await migrator.list();

  return migrator;
}
