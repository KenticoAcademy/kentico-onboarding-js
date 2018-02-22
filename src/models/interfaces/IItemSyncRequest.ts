import { Guid } from '../Guid';
import { SyncOperation } from '../enums/SyncOperation';

export interface IItemSyncRequest {
  readonly id: Guid;
  readonly operation: SyncOperation;
}
