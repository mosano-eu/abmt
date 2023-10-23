import { exec } from 'node:child_process';
import { join } from 'node:path';
import pkg from '../../package.json';

export async function runCliCommand(cmdAndArgs: string) {
  const distBinPath = join(__dirname, '../../', pkg.bin.abmt);
  const migrationsPath = join(
    __dirname,
    '../../', // cli root
    '../../', // monorepo root
    '__tests__/test-data/ts-project/migrations',
  );
  const abmtCommand = `"${distBinPath}" --migrations-path="${migrationsPath}" --orm sequelize --sequelize-uri="sqlite::memory:"`;

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
