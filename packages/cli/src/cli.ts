#!/usr/bin/env node --loader tsx

import { Command } from 'commander';
import dotenv from 'dotenv';

// Import commands
import { listCmd } from './commands/list';
import { setupCmdToOwnORM } from './options/orm';
import { setupCmdToOwnMigrations } from './options/migrations';
import { checkoutCmd } from './commands/checkout';
import { createCmd } from './commands/create';

// import register from '@swc/register';
// register();
// register({
//   module: {
//     type: 'commonjs',
//   },
//   jsc: {
//     target: 'es5',
//     keepClassNames: true,
//     loose: true,
//     parser: {
//       syntax: 'typescript',
//       decorators: true,
//       dynamicImport: true,
//     },
//   },
// });

(async function main() {
  dotenv.config({ path: '.env.local' });

  const program = new Command('abmt')
    .version('PKG_VERSION')
    .addCommand(listCmd)
    .addCommand(createCmd)
    .addCommand(checkoutCmd);

  setupCmdToOwnORM(program);
  setupCmdToOwnMigrations(program);

  await program.parseAsync(process.argv);
})();
