import { resolve, basename } from 'node:path';
import { statSync, readdirSync } from 'node:fs';
import { Migration } from '@abmf/core';

export function resolveMigrationsPath(providedPath: string) {
  // build all possible paths
  const patharrs = [
    [providedPath],
    [__dirname, providedPath],
    [process.cwd(), providedPath],
  ];

  for (const patharr of patharrs) {
    const fPath = resolve(...patharr);

    if (isDir(fPath)) return fPath;
  }

  throw new Error('Unable to solve migrations path');
}

function isDir(path: string) {
  const res = statSync(path);
  return res.isDirectory();
}

export function matchAndGetMigrationsFromMigrationsPath<Context>(
  migrationsPath: string,
  matchPattern: RegExp,
): Migration<Context>[] {
  const migrations: Migration<Context>[] = [];

  for (const path of readdirSync(migrationsPath)) {
    const fileName = basename(path);

    if (!fileName.match(matchPattern)) continue;

    // attempt to extract metadata from the file
    try {
      const res = require(path);

      // attempt to load default exported item
      const exported = res.default || res;

      // TODO: check if the filename matches the provided id and name

      // check if it is an instance of the migration class
      if (exported instanceof Migration) {
        migrations.push(exported);
      }
    } catch {
      // noop
    }
  }

  return migrations;
}
