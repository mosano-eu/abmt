import { createCommand } from 'commander';
import { setupCmdToOwnORM } from '../options/orm';
import { buildMigrator } from '../utils/migrator';
import { captureErrors } from '../utils/error-handler';
import chalk from 'chalk';
import { setupCmdToOwnMigrations } from '../options/migrations';
import Table from 'cli-table';

const listCmd = createCommand('list')
  .description('lists all the included migrations')
  .action(
    captureErrors(async () => {
      const { migrator } = await buildMigrator(migrateCmd);
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

setupCmdToOwnORM(migrationsCmd);
setupCmdToOwnMigrations(migrationsCmd);
