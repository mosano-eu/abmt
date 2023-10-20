import { SyncOrAsync } from './typings';

export type MigrationIdentifier = string;

export enum MigrationDirection {
  UP = 'up',
  DOWN = 'down',
}

export enum MigrationType {
  Schema = 'schema',
  Seed = 'seed',
}

export type MigrationDirectionFunction<Context> = (
  context: Context,
) => SyncOrAsync<void>;

export interface IMigrationMetadata {
  id: MigrationIdentifier;
  name: string;
  created_at: Date;
  optional: boolean;
  type: MigrationType;
}

export type IMigrationMetadataWithOptionalAttributes = Omit<
  IMigrationMetadata,
  'id' | 'type' | 'optional'
> &
  Partial<Pick<IMigrationMetadata, 'id' | 'type' | 'optional'>>;

export type MigrationOptions<Context> = {
  metadata: IMigrationMetadataWithOptionalAttributes;
  shouldBeExecuted?: () => SyncOrAsync<boolean>;
  [MigrationDirection.UP]?: MigrationDirectionFunction<Context>;
  [MigrationDirection.DOWN]?: MigrationDirectionFunction<Context>;
};

export class Migration<Context> {
  private metadata: IMigrationMetadataWithOptionalAttributes;
  readonly shouldBeExecuted?: () => SyncOrAsync<boolean>;
  readonly [MigrationDirection.UP]: MigrationDirectionFunction<Context>;
  readonly [MigrationDirection.DOWN]: MigrationDirectionFunction<Context>;

  constructor(options: MigrationOptions<Context>) {
    this.shouldBeExecuted = options.shouldBeExecuted;
    this[MigrationDirection.UP] = options[MigrationDirection.UP] || noop;
    this[MigrationDirection.DOWN] = options[MigrationDirection.DOWN] || noop;

    this.metadata = {
      ...defaultMetadata,
      ...options.metadata,
    };
  }

  get id(): MigrationIdentifier {
    return (
      this.metadata.id ||
      `${this.metadata.created_at.getTime()}-${this.metadata.name}`
    );
  }

  getMetadata(): IMigrationMetadata {
    return {
      ...defaultMetadata,
      ...this.metadata,
      id: this.id,
    };
  }
}

function noop() {}

const defaultMetadata = {
  optional: false,
  type: MigrationType.Schema,
};
