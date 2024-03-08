import chalk from 'chalk';
import { Command } from 'commander';

export async function notifyOnTerminal<T>(
  cmd: Command,
  msg: string,
  fn: () => Promise<T>,
): Promise<T> {
  // TODO: check cmd verbosity level

  process.stdout.write(chalk.gray(`> ${msg}... `));

  let errored: boolean = false;

  try {
    return await fn();
  } catch (err) {
    process.nextTick(() => error(err));
  } finally {
    process.stdout.write(errored ? chalk.red('FAILED') : chalk.green('OK'));
    process.stdout.write('\n');
  }
}

export function log(cmd: Command, msg: string) {
  // TODO: check cmd verbosity level
  console.log(chalk.gray(msg));
}

export function error(err: Error) {
  console.log(`
${chalk.redBright(err.name || 'Error')}: ${chalk.white(err.message)}
${chalk.gray(err.stack.split('\n').slice(1).join('\n'))}
`);
}
