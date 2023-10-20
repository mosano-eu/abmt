#!/bin/env node

import './utils/swc-registration';
import { Command } from 'commander';
import dotenv from 'dotenv';

// Import commands
import { listCmd } from './commands/list';
import { setupCmdToOwnORM } from './options/orm';
import { setupCmdToOwnMigrations } from './options/migrations';
import { checkoutCmd } from './commands/checkout';

(async function main() {
  dotenv.config({ path: '.env.local' });

  const program = new Command('abmf')
    .version('PKG_VERSION')
    .addCommand(listCmd)
    .addCommand(checkoutCmd);

  setupCmdToOwnORM(program);
  setupCmdToOwnMigrations(program);

  await program.parseAsync(process.argv);
})();
