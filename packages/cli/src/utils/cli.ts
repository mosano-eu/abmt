import chalk from 'chalk';

export async function notifyOnTerminal<T>(
  msg: string,
  fn: () => Promise<T>,
): Promise<T> {
  process.stdout.write(`> ${chalk.white(msg)}... `);

  let errored: boolean = false;

  try {
    return await fn();
  } catch {
  } finally {
    process.stdout.write(errored ? chalk.red('FAILED') : chalk.green('OK'));
    process.stdout.write('\n');
  }
}
