import { Migration } from '@abmf/core';
import type { MongooseORMContext } from '@abmf/orm-mongoose';

export default new Migration<MongooseORMContext>({
  metadata: {
    created_at: new Date(1697782454980),
    name: 'schema-rename-country.code-to-country.code2',
  },

  async up({ mongoose: { connection } }) {
    const Countries = connection.collection('countries');

    await Countries.bulkWrite([
      {
        updateMany: {
          filter: {},
          update: [{ $set: { code2: '$code' } }, { $unset: 'code' }],
        },
      },
    ]);
  },

  async down({ mongoose: { connection } }) {
    const Countries = connection.collection('countries');

    await Countries.bulkWrite([
      {
        updateMany: {
          filter: {},
          update: [{ $set: { code: '$code2' } }, { $unset: 'code2' }],
        },
      },
    ]);
  },
});
