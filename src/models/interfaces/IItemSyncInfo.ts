import { SyncState } from '../enums/SyncState';
import { Uuid } from '../Uuid';
import { SyncOperation } from '../enums/SyncOperation';

export interface IItemSyncInfo {
  id: Uuid;
  operation: SyncOperation;
  syncState: SyncState;
}
