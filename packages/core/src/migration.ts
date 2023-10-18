import { SyncOrAsync } from "./typings";

export type MigrationDirectionFunction<Context> = (
  context: Context
) => SyncOrAsync<void>;

export interface IMigrationMetadata {
  name: string;
  created_at: Date;
  id?: string;
  optional?: boolean;
}

export type MigrationOptions<Context> = {
  metadata: IMigrationMetadata;
  up: MigrationDirectionFunction<Context>;
  down: MigrationDirectionFunction<Context>;
};

export class Migration<Context> {
  metadata: IMigrationMetadata;
  up: MigrationDirectionFunction<Context>;
  down: MigrationDirectionFunction<Context>;

  constructor(options: MigrationOptions<Context>) {
    this.up = options.up;
    this.down = options.down;
  }

  get id() {
    return (
      this.metadata.id ||
      `${this.metadata.created_at.getTime()}-${this.metadata.name}`
    );
  }
}
