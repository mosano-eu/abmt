const core = require('@abmt/core');

module.exports = new core.Migration({
  metadata: {
    created_at: new Date(2),
    name: 'test-2',
    type: core.MigrationType.Seed,
  },

  up() {
    console.log('test-2 goes up');
  },

  down() {
    console.log('test-2 goes up');
  },
});
