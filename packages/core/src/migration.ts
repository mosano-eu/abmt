import { SyncOrAsync } from './typings';

export type MigrationIdentifier = string;

export enum MigrationDirection {
  UP = 'up',
  DOWN = 'down',
}

export type MigrationDirectionFunction<Context> = (
  context: Context,
) => SyncOrAsync<void>;

export interface IMigrationMetadata {
  name: string;
  created_at: Date;
  id: MigrationIdentifier;
  optional?: boolean;
}

export type IMigrationMetadataWithOptionalID = Omit<IMigrationMetadata, 'id'> &
  Partial<Pick<IMigrationMetadata, 'id'>>;

export type MigrationOptions<Context> = {
  metadata: IMigrationMetadataWithOptionalID;
  [MigrationDirection.UP]?: MigrationDirectionFunction<Context>;
  [MigrationDirection.DOWN]?: MigrationDirectionFunction<Context>;
};

export class Migration<Context> {
  private metadata: IMigrationMetadataWithOptionalID;
  [MigrationDirection.UP]: MigrationDirectionFunction<Context>;
  [MigrationDirection.DOWN]: MigrationDirectionFunction<Context>;

  constructor(options: MigrationOptions<Context>) {
    this[MigrationDirection.UP] = options[MigrationDirection.UP] || noop;
    this[MigrationDirection.DOWN] = options[MigrationDirection.DOWN] || noop;
  }

  get id(): MigrationIdentifier {
    return (
      this.metadata.id ||
      `${this.metadata.created_at.getTime()}-${this.metadata.name}`
    );
  }

  getMetadata(): IMigrationMetadata {
    return {
      ...this.metadata,
      id: this.id,
    };
  }
}

function noop() {}
