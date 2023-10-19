import { createCommand } from 'commander';
import { getOrmOptions } from '../options/orm';
import { MigrationType } from '../typings';
import { buildMigrator } from '../utils/migrator';
import { captureErrors } from '../utils/error-handler';

const listCmd = createCommand('list')
  .description('lists all the included migrations')
  .action(
    captureErrors(async () => {
      const { migrator } = await buildMigrator(migrateCmd);

      await migrator.sync();
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
