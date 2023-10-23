import { Command } from 'commander';
import { getORMProviders } from '../options/orm';
import { Migrator } from '@abmt/core';
import { getMigrationsProvider } from '../options/migrations';

export async function buildMigrator(cmd: Command) {
  const { contextProvider, storageProvider } = await getORMProviders(cmd);
  const migrationsProvider = getMigrationsProvider(cmd);

  const migrator = new Migrator({
    migrationsProvider,
    storageProvider,
    getContext: () => contextProvider.getContext(),
  });

  await migrator.list();

  return {
    migrator,
    migrationsProvider,
    storageProvider,
    contextProvider,
  };
}
