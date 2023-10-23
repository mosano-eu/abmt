import { Migration, MigrationType } from '@abmt/core';

module.exports = new Migration({
  metadata: {
    created_at: new Date(2),
    name: 'test-2',
    type: MigrationType.Seed,
  },

  up() {
    console.log('test-2 goes up');
  },

  down() {
    console.log('test-2 goes up');
  },
});
