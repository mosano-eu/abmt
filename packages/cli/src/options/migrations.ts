import { Command, createOption } from 'commander';
import { FSMigrationsProvider } from '@abmt/migrations-fs';

export function setupCmdToOwnMigrations(cmd: Command) {
  ///
  // Handle options
  const migrationsPath = createOption(
    '-p,--migrations-path <migrationsPath>',
    'relative or absolute path to the target migrations directory',
  ).default('./migrations');

  const migrationsPattern = createOption(
    '--migrations-match-pattern <migrationsPattern>',
    'relative or absolute path to the target migrations directory',
  ).default(/\.(js|ts)/);

  cmd.addOption(migrationsPath);
  cmd.addOption(migrationsPattern);
}

export function getMigrationsProvider(cmd: Command) {
  const options = cmd.optsWithGlobals();

  return new FSMigrationsProvider({
    migrationsPath: options.migrationsPath,
    migrationsPattern: options.migrationsPattern,
  });
}
