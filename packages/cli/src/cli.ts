#!/bin/env node

import './utils/swc-registration';
import { Command } from 'commander';
import dotenv from 'dotenv';

// Import commands
import { migrationsCmd } from './commands/migrations';

(async function main() {
  dotenv.config({ path: '.env.local' });

  const program = new Command();
  program.version('PKG_VERSION');

  program

    // add commands
    .addCommand(migrationsCmd);

  await program.parseAsync(process.argv);
})();
