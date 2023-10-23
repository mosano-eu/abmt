import { runCliCommand } from './fixtures/run-command';

describe('abmt', () => {
  describe('list', () => {
    it('should list the existing migrations', async () => {
      const result = await runCliCommand('abmt list');

      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('1-test-1');
      expect(result.stdout).toContain('2-test-2');
    });
  });

  describe('checkout', () => {
    it.skip('should apply all tests up to the latest when no target is provided', async () => {
      // Write a test case that applies all migrations without specifying a target migration.
    });

    it.skip('should exit with a non-zero signal on each attempt to apply a non-existent migration', async () => {
      // Write a test case that tries to apply a non-existent migration and checks the exit code.
    });

    it.skip('should allow checking out old migrations and trigger down calls on newer migrations that were applied', async () => {
      // Write a test case that checks out an old migration and ensures down calls are triggered on newer migrations.
    });
  });

  describe('create', () => {
    it.skip('should list a newly created test', async () => {
      // Write a test case that creates a new migration and then runs "abmt list" to check if it's listed.
    });
  });
});
