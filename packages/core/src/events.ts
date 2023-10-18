import { EventEmitter } from 'events';

export class MigratorEvents {
  private emitter = new EventEmitter();

  emit<TEventName extends keyof TMigratorEvents & string>(
    eventName: TEventName,
    ...eventArg: TMigratorEvents[TEventName]
  ) {
    this.emitter.emit(eventName, ...(eventArg as unknown as []));
  }

  on<TEventName extends keyof TMigratorEvents & string>(
    eventName: TEventName,
    handler: (...eventArg: TMigratorEvents[TEventName]) => void,
  ) {
    this.emitter.on(eventName, handler as () => void);
  }

  off<TEventName extends keyof TMigratorEvents & string>(
    eventName: TEventName,
    handler: (...eventArg: TMigratorEvents[TEventName]) => void,
  ) {
    this.emitter.off(eventName, handler as () => void);
  }
}

export enum EventType {
  Error = 'error',
  Log = 'log',
  MigrationDirectionExecuted = 'migration-direction-executed',
}

export type TMigratorEvents = {
  [EventType.Error]: [Error];
  [EventType.Log]: [{ message: string; context?: {} }];
  [EventType.MigrationDirectionExecuted]: [
    | {
        successful: true;
      }
    | {
        successful: false;
        error: Error;
      },
  ];
};
