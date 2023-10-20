import { Migration } from '@abmt/core';
import { InMemoryMigrationsProvider } from './migrations-provider';

jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));

describe('Migrator', () => {
  const migrationsProvider = new InMemoryMigrationsProvider({
    migrations: [
      new Migration({
        metadata: {
          name: 'first',
          created_at: new Date(1),
        },
        up: jest.fn(),
        down: jest.fn(),
      }),
      new Migration({
        metadata: { name: 'second', created_at: new Date(2) },
        up: jest.fn(),
        down: jest.fn(),
      }),
    ],
  });

  it('should identify and load all the migrations', async () => {
    const migrations = await migrationsProvider.getAllMigrations();

    expect(migrations).toHaveLength(2);
    expect(migrations[0]).toBeInstanceOf(Migration);
  });
});
