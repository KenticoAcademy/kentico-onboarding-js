import { ItemSyncInfo } from '../../../models/classes/ItemSyncInfo';
import { SyncOperation } from '../../../models/enums/SyncOperation';
import { SyncState } from '../../../models/enums/SyncState';
import { IAction } from '../../../models/interfaces/IAction';
import {
  ITEM_ADD_START,
  ITEM_DELETE_AFTER_UPDATE_REVERT,
  ITEM_DELETE_REVERT,
  ITEM_DELETE_START,
  ITEM_SYNC_FAILED,
  ITEM_UPDATE_REVERT,
  ITEM_UPDATE_START,
  ITEM_UPDATE_SUCCESS,
} from '../../../constants/actionTypes';
import { requestedDeleteAfterFailedUpdate } from '../../../utils/requestedDeleteAfterFailedUpdate';

export const syncInfo = (state: ItemSyncInfo, { payload, type }: IAction): ItemSyncInfo => {
  switch (type) {
    case ITEM_ADD_START:
    case ITEM_DELETE_START:
    case ITEM_UPDATE_START:
    case ITEM_UPDATE_SUCCESS: {
      const { itemSyncInfo } = payload;
      const operation = requestedDeleteAfterFailedUpdate(state, itemSyncInfo)
        ? SyncOperation.DeleteAfterFailedUpdate
        : itemSyncInfo.operation;

      return state.with({
        operation,
        syncState: itemSyncInfo.syncState
      });
    }
    case ITEM_SYNC_FAILED: {
      return state.with({ syncState: SyncState.Desynced });
    }
    case ITEM_UPDATE_REVERT:
    case ITEM_DELETE_REVERT: {
      return state.with({
        syncState: SyncState.Synced,
        operation: SyncOperation.Default,
      });
    }
    case ITEM_DELETE_AFTER_UPDATE_REVERT: {
      return state.with({
        syncState: SyncState.Desynced,
        operation: SyncOperation.Update,
      });
    }
    default:
      return state;
  }
};
