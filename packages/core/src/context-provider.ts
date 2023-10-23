import { SyncOrAsync } from './typings';

export interface IContextProvider<Context> {
  getContext(): SyncOrAsync<Context>;
}
