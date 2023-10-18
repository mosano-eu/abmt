export enum MigrationDirection {
  UP = "UP",
  DOWN = "DOWN",
}

export interface IMigrationProvider {
  executeMigration<Context>(
    id: IMigrationMetadata["id"],
    direction: MigrationDirection,
    context: Context
  ): Promise<void>;
}
