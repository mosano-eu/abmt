import { Migration } from '@abmf/core';
import type { MongooseORMContext } from '@abmf/orm-mongoose';

export default new Migration<MongooseORMContext>({
  metadata: {
    created_at: new Date(1697782454980),
    name: 'schema-rename-country.code-to-country.code2',
  },

  async up({ mongoose: { connection } }) {
    const Countries = connection.collection('countries');

    await Countries.findAndModify({
      update: [{ $addFields: { code2: '$code' } }, { $project: { code: -1 } }],
    });
  },

  async down({ mongoose: { connection } }) {
    const Countries = connection.collection('countries');

    await Countries.findAndModify({
      update: [{ $addFields: { code: '$code2' } }, { $project: { code2: -1 } }],
    });
  },
});
