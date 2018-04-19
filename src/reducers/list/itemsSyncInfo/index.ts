import { IAction } from '../../../models/interfaces/IAction';
import {
  ITEM_ADD_SUCCESS,
  ITEMS_FETCH_SUCCESS,
  ITEM_UPDATE_START,
  ITEM_DELETE_START,
  ITEM_ADD_START,
  ITEM_DELETE_SUCCESS,
  ITEM_SYNC_FAILED,
  ITEM_UPDATE_SUCCESS,
  UNSAVED_ITEM_DELETE,
  ITEM_ADD_REVERT,
  ITEM_UPDATE_REVERT,
  ITEM_DELETE_REVERT,
  ITEM_DELETE_AFTER_UPDATE_REVERT,
} from '../../../constants/actionTypes';
import { SyncState } from '../../../models/enums/SyncState';
import { ItemSyncInfo } from '../../../models/classes/ItemSyncInfo';
import { OrderedMap } from 'immutable';
import { Uuid } from '../../../models/Uuid';
import { ItemsSyncInfoState } from '../../../models/state/ItemsSyncInfoState';
import { SyncOperation } from '../../../models/enums/SyncOperation';
import { IListItem } from '../../../models/interfaces/IListItem';
import { IItemSyncInfo } from '../../../models/interfaces/IItemSyncInfo';
import { arrayToOrderedMap } from '../../../utils/arrayToOrderedMap';
import { syncInfo } from './syncInfo';

const initialState: ItemsSyncInfoState = OrderedMap<Uuid, ItemSyncInfo>();

export const itemsSyncInfo = (state = initialState, action: IAction): ItemsSyncInfoState => {
  const { payload } = action;

  switch (action.type) {
    case ITEM_ADD_START:
    case ITEM_DELETE_START:
    case ITEM_UPDATE_START:
    case ITEM_UPDATE_SUCCESS: {
      const { itemSyncInfo } = payload;

      return itemSyncInfo
        ? state.update(
          itemSyncInfo.id,
          new ItemSyncInfo({
            id: itemSyncInfo.id,
          }),
          originalSyncInfo => syncInfo(originalSyncInfo, action)
        )
        : state;
    }
    case ITEM_ADD_SUCCESS: {
      const { updatedItem, oldId } = payload;

      return state
        .set(
          updatedItem.id,
          new ItemSyncInfo({
            id: updatedItem.id,
            syncState: SyncState.Synced,
            operation: SyncOperation.Add,
          }),
        )
        .delete(oldId);
    }
    case ITEM_DELETE_SUCCESS:
    case UNSAVED_ITEM_DELETE:
    case ITEM_ADD_REVERT: {
      return state.delete(payload.id);
    }
    case ITEM_UPDATE_REVERT:
    case ITEM_DELETE_REVERT:
    case ITEM_SYNC_FAILED:
    case ITEM_DELETE_AFTER_UPDATE_REVERT: {
      return state.update(payload.id, originalSyncInfo => syncInfo(originalSyncInfo, action));
    }
    case ITEMS_FETCH_SUCCESS: {
      const items = payload.items.map(({ id }: IListItem): IItemSyncInfo => ({
        id,
        syncState: SyncState.Synced,
        operation: SyncOperation.Default,
      }));

      return arrayToOrderedMap(items, ItemSyncInfo);
    }
    default:
      return state;
  }
};
