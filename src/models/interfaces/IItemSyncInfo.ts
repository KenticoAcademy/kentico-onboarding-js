import { SyncState } from '../enums/SyncState';
import { Guid } from '../Guid';
import { SyncOperation } from '../enums/SyncOperation';

export interface IItemSyncInfo {
  readonly id: Guid;
  readonly operation: SyncOperation;
  readonly syncState: SyncState;
}
