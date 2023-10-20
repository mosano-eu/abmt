import { createCommand } from 'commander';
import { buildMigrator } from '../utils/migrator';
import { captureErrors } from '../utils/error-handler';
import chalk from 'chalk';
import { EventType } from '@abmt/core';
import { error, log } from '../utils/cli';

export const checkoutCmd = createCommand('checkout')
  .description('migrates the database to a certain version')
  .argument('[migration-id]', 'ID to the target migration')
  .action(
    captureErrors(async (migrationId) => {
      const { migrator } = await buildMigrator(checkoutCmd);

      migrator.on(EventType.Error, (err) => {
        error(err);
      });

      migrator.on(
        EventType.MigrationDirectionGoingToExecute,
        ({ migration, direction }) => {
          log(
            checkoutCmd,
            `> Attempting to execute migration ${chalk.white(
              migration.id,
            )} - ${chalk.yellowBright(direction)}`,
          );
        },
      );

      migrator.on(
        EventType.MigrationDirectionExecuted,
        ({ migration, direction, successful }) => {
          log(
            checkoutCmd,
            successful
              ? `> Migration ${chalk.white(
                  migration.id,
                )} - ${chalk.yellowBright(direction)} was ${chalk.green(
                  'SUCCESSFULLY EXECUTED',
                )}`
              : `> Migration ${chalk.white(
                  migration.id,
                )} - ${chalk.yellowBright(direction)} has ${chalk.red(
                  'FAILED TO EXECUTE',
                )}`,
          );
        },
      );

      await migrator.checkout(migrationId);
    }),
  );
