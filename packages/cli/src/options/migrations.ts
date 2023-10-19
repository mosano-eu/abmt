import { Command, Option, createOption } from 'commander';
import flatten from 'lodash/flatten';
import { MigrationType } from '../typings';
import { FSMigrationsProvider } from '@abmf/migrations-fs';

export function getOrmOptions(migrationType: MigrationType): Option[] {
  const migrationsPath = createOption(
    '-p,--migrations-path <migrationsPath>',
    'relative or absolute path to the target migrations directory',
  ).default(
    (migrationType === MigrationType.Seeds && './seeds') || './migrations',
  );

  const migrationsPattern = createOption(
    '--migrations-match-pattern <migrationsPattern>',
    'relative or absolute path to the target migrations directory',
  ).default(/\.(js|ts)/);

  return flatten([migrationsPath, migrationsPattern]);
}

export async function getMigrationsProvider<Context>(cmd: Command) {
  const options = cmd.optsWithGlobals();

  return new FSMigrationsProvider({
    migrationsPath: options.migrationsPath,
    migrationsPattern: options.migrationsPattern,
  });
}
