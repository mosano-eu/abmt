import { Migration, MigrationType } from '@abmt/core';

module.exports = new Migration({
  metadata: {
    created_at: new Date(1),
    name: 'test-1',
    type: MigrationType.Seed,
  },

  up() {
    console.log('test-1 goes up');
  },

  down() {
    console.log('test-1 goes up');
  },
});
