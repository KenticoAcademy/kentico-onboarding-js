import { ItemSyncInfo } from '../../../models/classes/ItemSyncInfo';
import { SyncOperation } from '../../../models/enums/SyncOperation';
import { SyncState } from '../../../models/enums/SyncState';
import { IItemSyncInfo } from '../../../models/interfaces/IItemSyncInfo';

const deleteHasFailedAfterFailedUpdate = (oldItemSyncInfo: IItemSyncInfo, newItemSyncInfo: IItemSyncInfo) => {
  const isDeleteRequest = newItemSyncInfo.operation === SyncOperation.Delete;
  const previouslyFailed = oldItemSyncInfo.syncState === SyncState.Desynced;
  const failStackContainsUpdate =
    oldItemSyncInfo.operation === SyncOperation.Update
    || oldItemSyncInfo.operation === SyncOperation.DeleteAfterFailedUpdate;

  return previouslyFailed
  && failStackContainsUpdate
  && isDeleteRequest;
};

export const setSyncStateReducer = (itemSyncInfo: ItemSyncInfo, updatedSyncInfo: ItemSyncInfo): ItemSyncInfo => {
  const operation = deleteHasFailedAfterFailedUpdate(itemSyncInfo, updatedSyncInfo)
    ? SyncOperation.DeleteAfterFailedUpdate
    : updatedSyncInfo.operation;

  return itemSyncInfo.with({
    operation,
    syncState: updatedSyncInfo.syncState,
  });
};

export const revertOperationReducer = (itemSyncInfo: ItemSyncInfo): ItemSyncInfo =>
  itemSyncInfo.with({
    syncState: SyncState.Synced,
    operation: SyncOperation.Default,
  });

export const revertDeleteAfterFailedUpdateReducer = (itemSyncInfo: ItemSyncInfo): ItemSyncInfo =>
  itemSyncInfo.with({
    syncState: SyncState.Desynced,
    operation: SyncOperation.Update,
  });

export const desyncItemReducer = (itemSyncInfo: ItemSyncInfo): ItemSyncInfo =>
  itemSyncInfo.with({
    syncState: SyncState.Desynced,
  });
