import { SyncOperation } from '../models/enums/SyncOperation';
import { IItemSyncInfo } from '../models/interfaces/IItemSyncInfo';
import { SyncState } from '../models/enums/SyncState';

export const requestedDeleteAfterFailedUpdate = (oldItemSyncInfo: IItemSyncInfo, newItemSyncInfo: IItemSyncInfo) => {
  const isDeleteRequest = newItemSyncInfo.operation === SyncOperation.Delete;
  const previouslyFailed = oldItemSyncInfo.syncState === SyncState.Desynced;
  const failStackContainsUpdate =
    oldItemSyncInfo.operation === SyncOperation.Update
    || oldItemSyncInfo.operation === SyncOperation.DeleteAfterFailedUpdate;

  return previouslyFailed
    && failStackContainsUpdate
    && isDeleteRequest;
};
