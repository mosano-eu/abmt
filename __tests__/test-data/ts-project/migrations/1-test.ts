const core = require('@abmt/core');

module.exports = new core.Migration({
  metadata: {
    created_at: new Date(1),
    name: 'test-1',
    type: core.MigrationType.Seed,
  },

  up() {
    console.log('test-1 goes up');
  },

  down() {
    console.log('test-1 goes up');
  },
});
