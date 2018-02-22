import { SyncState } from '../enums/SyncState';
import { IItemSyncRequest } from './IItemSyncRequest';

export interface IItemSyncInfo extends IItemSyncRequest {
  readonly state: SyncState;
}
