import { createCommand } from 'commander';
import { buildMigrator } from '../utils/migrator';
import { captureErrors } from '../utils/error-handler';
import chalk from 'chalk';
import Table from 'cli-table';

export const listCmd = createCommand('list')
  .description('lists all the migrations')
  .action(
    captureErrors(async () => {
      const { migrator } = await buildMigrator(listCmd);
      const migrations = await migrator.list();

      const table = new Table({
        head: ['ID', 'Type', 'Status', 'Applied At'],
        rows: migrations.map(({ metadata, status, applied_at }) => [
          // ID
          chalk.bold(metadata.id),
          // TYPE
          metadata.type,
          // STATUS
          (status === 'new' && chalk.whiteBright.bold('NEW')) ||
            (status === 'up' && chalk.greenBright.bold('UP')) ||
            (status === 'down' && chalk.red('DOWN')),
          // APPLIED AT
          (applied_at && chalk.gray(applied_at.toDateString())) || '',
        ]),
      });

      // wrap values with Chalk
      process.stdout.write(table.toString());
    }),
  );
