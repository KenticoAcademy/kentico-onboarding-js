import { SyncOperation } from '../models/enums/SyncOperation';
import { SyncState } from '../models/enums/SyncState';
import { IItemSyncInfo } from '../models/interfaces/IItemSyncInfo';

export const isClickable = (itemSyncInfo: IItemSyncInfo): boolean =>
  !(
    itemSyncInfo.syncState === SyncState.Pending
    || (
      itemSyncInfo.syncState === SyncState.Desynced
      && (
        itemSyncInfo.operation === SyncOperation.Delete
        || itemSyncInfo.operation === SyncOperation.DeleteAfterFailedUpdate
      )
    )
  );
