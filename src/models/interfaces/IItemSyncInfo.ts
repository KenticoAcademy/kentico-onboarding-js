import { SyncState } from '../enums/SyncState';
import { Uuid } from '../Uuid';
import { SyncOperation } from '../enums/SyncOperation';

export interface IItemSyncInfo {
  readonly id: Uuid;
  readonly operation: SyncOperation;
  readonly syncState: SyncState;
}
