import { EventEmitter } from 'events';
import { Migration, MigrationDirection } from './migration';

export class MigratorEvents<Context> {
  private emitter = new EventEmitter();

  emit<TEventName extends keyof TMigratorEvents<Context> & string>(
    eventName: TEventName,
    ...eventArg: TMigratorEvents<Context>[TEventName]
  ) {
    this.emitter.emit(eventName, ...(eventArg as unknown as []));
  }

  on<TEventName extends keyof TMigratorEvents<Context> & string>(
    eventName: TEventName,
    handler: (...eventArg: TMigratorEvents<Context>[TEventName]) => void,
  ) {
    this.emitter.on(eventName, handler as () => void);
  }

  off<TEventName extends keyof TMigratorEvents<Context> & string>(
    eventName: TEventName,
    handler: (...eventArg: TMigratorEvents<Context>[TEventName]) => void,
  ) {
    this.emitter.off(eventName, handler as () => void);
  }
}

export enum EventType {
  Error = 'error',
  Log = 'log',
  MigrationDirectionGoingToExecute = 'migration-direction-going-to-execute',
  MigrationDirectionExecuted = 'migration-direction-executed',
}

export type TMigratorEvents<Context> = {
  [EventType.Error]: [Error];
  [EventType.Log]: [{ message: string; context?: unknown }];
  [EventType.MigrationDirectionGoingToExecute]: [
    { migration: Migration<Context>; direction: MigrationDirection },
  ];
  [EventType.MigrationDirectionExecuted]: [
    { migration: Migration<Context>; direction: MigrationDirection } & (
      | {
          successful: true;
        }
      | {
          successful: false;
          error: Error;
        }
    ),
  ];
};
