import { Migration } from '@abmf/core';

export default new Migration({
  metadata: {
    created_at: new Date(1),
    name: 'test',
  },

  up() {
    console.log('up');
  },
  down() {
    console.log('down');
  },
});
