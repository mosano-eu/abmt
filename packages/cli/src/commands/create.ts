import { createCommand, createOption } from 'commander';
import { MigrationType } from '@abmt/core';
import kebabCase from 'lodash/kebabCase';
import { join } from 'node:path';
import { writeFile } from 'node:fs/promises';
import { getMigrator } from '../options/migrator';
import { captureErrors } from '../utils/error-handler';
import { log } from '../utils/cli';

export enum MigrationFormat {
  Typescript = 'ts',
  CommonJS = 'cjs',
  // ESModule = "mjs"
}

export const createCmd = createCommand('create')
  .description('creates a new migration')
  .argument('[name]', 'Migration name')
  .addOption(
    createOption('-t, --migration-type', 'migration type')
      .choices(Object.values(MigrationType))
      .default(MigrationType.Schema),
  )
  .addOption(
    createOption('-f, --migration-format', 'migration format')
      .choices(Object.values(MigrationFormat))
      .default(MigrationFormat.Typescript),
  )
  .action(
    captureErrors(async (optionalName, options) => {
      const migrator = await getMigrator(createCmd);

      const timestamp = Date.now();
      const name = kebabCase(optionalName || 'new migration');
      const migrationFormat = options.migrationFormat as MigrationFormat;
      const migrationType = options.migrationType as MigrationType;

      const migrationPath = join(
        migrator.migrationsProvider.migrationsPath,
        `${timestamp}-${name}.${migrationFormat}`,
      );

      ///
      // create migration
      const content =
        (migrationFormat === MigrationFormat.Typescript &&
          createTypescriptMigration(name, timestamp, migrationType)) ||
        (migrationFormat === MigrationFormat.CommonJS &&
          createCommonJSMigration(name, timestamp, migrationType)) ||
        '';

      if (!content) {
        throw new Error('Unable to create a template for the given migration');
      }

      // save migration file
      await writeFile(migrationPath, content);

      log(
        createCmd,
        `Migration ${name} was created successfully. Please edit it at "${migrationPath}"`,
      );
    }),
  );

function createTypescriptMigration(
  name: string,
  timestamp: number,
  type: MigrationType,
) {
  const migrationType = Object.entries(MigrationType).find(
    ([, v]) => v === type,
  );

  return `
import { Migration, MigrationType } from '@abmt/core';

export default new Migration({
  metadata: {
    name: '${name.replace(/'/g, `\\\'`)}',
    created_at: new Date(${timestamp}),
    type: MigrationType.${migrationType[0]},
  },

  async up() {
    // @TODO: Migration code goes here
  },

  async down() {
    // @TODO: Migration code goes here
  }
})
`;
}

function createCommonJSMigration(
  name: string,
  timestamp: number,
  type: MigrationType,
) {
  const migrationType = Object.entries(MigrationType).find(
    ([, v]) => v === type,
  );

  return `
const core = require('@abmt/core');

module.exports = new core.Migration({
  metadata: {
    name: '${name.replace(/'/g, `\\\'`)}',
    created_at: new Date(${timestamp}),
    type: core.MigrationType.${migrationType[0]},
  },

  up() {
    // @TODO: Migration code goes here
  },

  down() {
    // @TODO: Migration code goes here
  },
});
`;
}
