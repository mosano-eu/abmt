import { createCommand } from 'commander';
import { getOrmOptions } from '../options/orm';
import { MigrationType } from '../typings';
import { getMigrationsOptions } from '../options/migrations';

const migrateCmd = createCommand('migrate')
  .description('migrates the database to a certain version')
  .argument('[migration-id]', 'ID to the target migration');

export const seedsCmd = createCommand('seeds')
  .description('handles seed migrations')
  .addCommand(migrateCmd);

// add migration options
for (const option of getOrmOptions(MigrationType.Seeds)) {
  seedsCmd.addOption(option);
}
for (const option of getMigrationsOptions(MigrationType.Seeds)) {
  seedsCmd.addOption(option);
}
