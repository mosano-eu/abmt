import { createCommand } from 'commander';
import { getOrmOptions } from '../options/orm';
import { MigrationType } from '../typings';
import { buildMigrator } from '../utils/migrator';
import { captureErrors } from '../utils/error-handler';
import chalk from 'chalk';
import { getMigrationsOptions } from '../options/migrations';
import Table from 'cli-table';

const listCmd = createCommand('list')
  .description('lists all the included migrations')
  .action(
    captureErrors(async () => {
      const { migrator } = await buildMigrator(migrateCmd);
      console.log('yeye');
      const migrations = await migrator.list();
      console.log('yey2');
      console.log({ migrations });

      const table = new Table({
        head: ['ID', 'Status', 'Applied At'],
        rows: migrations.map(({ id, status, applied_at }) => [
          chalk.bold(id),
          (status === 'new' && chalk.whiteBright.bold('NEW')) ||
            (status === 'up' && chalk.greenBright.bold('UP')) ||
            (status === 'down' && chalk.red('DOWN')),
          (applied_at && chalk.gray(applied_at.toDateString())) || '',
        ]),
      });

      // wrap values with Chalk
      process.stdout.write(table.toString());
    }),
  );

const migrateCmd = createCommand('migrate')
  .description('migrates the database to a certain version')
  .argument('[migration-id]', 'ID to the target migration')
  .action(
    captureErrors(async () => {
      const { migrator } = await buildMigrator(migrateCmd);
    }),
  );

export const migrationsCmd = createCommand('migrations')
  .description('handles migrations towards schema and data versioned changes')
  .addCommand(listCmd)
  .addCommand(migrateCmd);

// add migration options
for (const option of getOrmOptions(MigrationType.Schema)) {
  migrationsCmd.addOption(option);
}
for (const option of getMigrationsOptions(MigrationType.Schema)) {
  migrationsCmd.addOption(option);
}
