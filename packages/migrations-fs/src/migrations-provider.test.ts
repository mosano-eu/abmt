import { Migration } from '@abmt/core';
import { FSMigrationsProvider } from '../src/migrations-provider';
import { join } from 'node:path';

jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));

describe('Migrator', () => {
  const migrationsProvider = new FSMigrationsProvider({
    migrationsPath: join(
      __dirname,
      '../../../__tests__/test-data/js-project/migrations',
    ),
  });

  it('should identify and load all the migrations', async () => {
    const migrations = await migrationsProvider.getAllMigrations();

    expect(migrations).toHaveLength(2);
    expect(migrations[0]).toBeInstanceOf(Migration);
  });
});
