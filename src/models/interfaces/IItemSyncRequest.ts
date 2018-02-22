import { Guid } from '../Guid';
import { SyncOperation } from '../enums/SyncOperation';

export interface IItemSyncRequest {
  id: Guid;
  operation: SyncOperation;
}
