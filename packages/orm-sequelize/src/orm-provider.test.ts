import {
  IStoredMigrationReference,
  MigrationDirection,
  MigrationOptions,
  Migrator,
  createMockMigrationsProvider,
} from '@abmt/core';
import { SequelizeORMContext } from './typings';
import { SequelizeORM } from './orm-provider';
import { Sequelize } from 'sequelize';

jest
  .useFakeTimers({ doNotFake: ['nextTick'] })
  .setSystemTime(new Date('2020-01-01'));

describe('SequelizeORM', () => {
  describe('ContextProvider', () => {
    it.todo('should provide an open connection as context');
  });

  describe('StorageProvider', () => {
    it('should update and sync migrations', async () => {
      const { migrator, ormProvider, migrationsProvider, sequelize } =
        await buildMigrator([
          {
            metadata: { name: 'first', created_at: new Date(1) },
            up: jest.fn(),
            down: jest.fn(),
          },
          {
            metadata: { name: 'second', created_at: new Date(2) },
            up: jest.fn(),
            down: jest.fn(),
          },
        ]);

      try {
        expect(await ormProvider.getStoredMigrationReferences()).toStrictEqual(
          [],
        );

        await migrator.sync();

        // the stored migration references should have all the references defined and the direction and date related with the event when it was last applied
        const referencesBeforeGoToCall =
          await ormProvider.getStoredMigrationReferences();
        expect(referencesBeforeGoToCall).toStrictEqual([
          {
            id: '1-first',
            name: 'first',
            created_at: new Date(1),
            last_applied: undefined,
          },
          {
            id: '2-second',
            name: 'second',
            created_at: new Date(2),
            last_applied: undefined,
          },
        ] as IStoredMigrationReference[]);

        for (const migration of await migrationsProvider.getAllMigrations()) {
          expect(migration.up).toBeCalledTimes(0);
          expect(migration.down).toBeCalledTimes(0);
        }

        await migrator.checkout();

        // expect all the up functions should have been called
        /// and expect all the down functions NOT to be called
        for (const migration of await migrationsProvider.getAllMigrations()) {
          expect(migration.up).toBeCalledTimes(1);
          expect(migration.down).toBeCalledTimes(0);
        }

        // the stored migration references should have all the references defined and the direction and date related with the event when it was last applied
        const referencesAfterGoToCall =
          await ormProvider.getStoredMigrationReferences();
        expect(referencesAfterGoToCall).toStrictEqual([
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
      } finally {
        await sequelize.close();
      }
    });
  });
});

async function buildMigrator(
  migrationsOpts: MigrationOptions<SequelizeORMContext>[],
) {
  const sequelize = new Sequelize('sqlite::memory:');

  const ormProvider = new SequelizeORM({ sequelize });
  const migrationsProvider = createMockMigrationsProvider(migrationsOpts);

  const migrator = new Migrator({
    migrationsProvider,
    storageProvider: ormProvider,
    getContext: () => ormProvider.getContext(),
  });

  await sequelize.sync();

  return {
    sequelize,
    migrator,
    migrationsProvider,
    ormProvider,
  };
}
