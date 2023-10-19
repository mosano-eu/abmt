import { createCommand } from 'commander';
import { getOrmOptions } from '../options/orm';
import { MigrationType } from '../typings';

const migrateCmd = createCommand('migrate')
  .description('migrates the database to a certain version')
  .argument('[migration-id]', 'ID to the target migration');

export const migrationsCmd = createCommand('migrations')
  .description('handles migrations towards schema and data versioned changes')
  .addCommand(migrateCmd);

// add migration options
for (const option of getOrmOptions(MigrationType.Schema)) {
  migrationsCmd.addOption(option);
}
