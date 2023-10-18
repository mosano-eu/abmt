import { Migration } from './migration';

describe('Migration', () => {
  it('should concat the name and created date when the id is not provided', () => {
    const name = 'test';
    const created_at = new Date();

    const migration = new Migration({
      metadata: {
        name,
        created_at,
      },
    });

    expect(migration.getMetadata().id).toBe(`${created_at.getTime()}-${name}`);
  });
});
