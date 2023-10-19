#!/bin/env node

import { Command } from 'commander';
import dotenv from 'dotenv';

// Import commands
import { migrationsCmd } from './commands/migrations';
import { seedsCmd } from './commands/seeds';

(async function main() {
  dotenv.config({ path: '.env.local' });

  const program = new Command();

  program

    // add commands
    .addCommand(migrationsCmd)
    .addCommand(seedsCmd);

  await program.parseAsync(process.argv);
})();
