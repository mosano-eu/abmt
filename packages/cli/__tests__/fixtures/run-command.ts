import { exec } from 'node:child_process';
import { join } from 'node:path';

export async function runCliCommand(cmdAndArgs: string) {
  const distBinPath = join(__dirname, '../../dist/cjs/cli.min.js');
  const migrationsPath = join(
    __dirname,
    '../../../../__tests__/test-data/ts-project/migrations',
  );
  const abmtCommand = `node "${distBinPath}" --migrations-path="${migrationsPath}"`;

  const command = cmdAndArgs.replace('abmt', abmtCommand);
  return await new Promise<{
    stdout: string;
    stderr: string;
    exitCode: number;
  }>((ful, rej) => {
    const child = exec(command, (err, stdout, stderr) => {
      if (err) {
        rej(err);
      } else {
        ful({ stdout, stderr, exitCode: child.exitCode });
      }
    });
  });
}
