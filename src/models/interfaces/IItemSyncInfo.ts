import { SyncState } from '../enums/SyncState';
import { SyncOperation } from '../enums/SyncOperation';
import { Guid } from '../Guid';

export interface IItemSyncInfo {
  readonly id: Guid;
  readonly state: SyncState;
  readonly operation: SyncOperation;
  readonly description: string;
}
