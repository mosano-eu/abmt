import { IStoredMigrationReference } from './storage-provider';
import { buildMockedSetup } from './mock';
import { MigrationDirection } from './migration';

jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));

describe('Migrator', () => {
  const setup = buildMockedSetup<{ foo: 'bar' }>(
    [
      {
        metadata: {
          name: 'first',
          created_at: new Date(1),
        },
        up: jest.fn(),
        down: jest.fn(),
      },
      {
        metadata: { name: 'second', created_at: new Date(2) },
        up: jest.fn(),
        down: jest.fn(),
      },
    ],
    () => ({ foo: 'bar' }),
  );

  it('should execute all the migrations and mark as executed', async () => {
    const { migrator, storageProvider, migrationsProvider } = setup;

    expect(await storageProvider.getStoredMigrationReferences()).toStrictEqual(
      [],
    );

    for (const migration of await migrationsProvider.getAllMigrations()) {
      expect(migration.up).toBeCalledTimes(0);
      expect(migration.down).toBeCalledTimes(0);
    }

    await migrator.checkout(); // should default to latest

    // expect all the up functions should have been called
    /// and expect all the down functions NOT to be called
    for (const migration of await migrationsProvider.getAllMigrations()) {
      expect(migration.up).toBeCalledTimes(1);
      expect(migration.down).toBeCalledTimes(0);
    }

    // the stored migration references should have all the references defined and the direction and date related with the event when it was last applied
    expect(await storageProvider.getStoredMigrationReferences()).toStrictEqual([
      {
        id: '1-first',
        name: 'first',
        created_at: new Date(1),
        last_applied: {
          direction: MigrationDirection.UP,
          at: new Date(),
        },
      },
      {
        id: '2-second',
        name: 'second',
        created_at: new Date(2),
        last_applied: {
          direction: MigrationDirection.UP,
          at: new Date(),
        },
      },
    ] as IStoredMigrationReference[]);
  });
});
