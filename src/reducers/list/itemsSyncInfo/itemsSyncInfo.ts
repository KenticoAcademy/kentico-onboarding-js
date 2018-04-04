import { IAction } from '../../../models/interfaces/IAction';
import {
  ADD_NEW_ITEM_CONFIRM,
  RECEIVE_ITEMS,
  SAVE_ITEM_CHANGES_REQUEST,
  DELETE_ITEM_REQUEST,
  ADD_NEW_ITEM_REQUEST,
  DELETE_ITEM_CONFIRM,
  ITEM_SYNC_FAILED,
  SAVE_ITEM_CHANGES_CONFIRM,
  DELETE_UNSAVED_ITEM,
  REVERT_ADD,
  REVERT_MODIFY,
  REVERT_DELETE,
  REVERT_DELETE_AFTER_MODIFY_FAILED,
} from '../../../constants/actionTypes';
import { SyncState } from '../../../models/enums/SyncState';
import { ItemSyncInfo } from '../../../models/classes/ItemSyncInfo';
import { OrderedMap } from 'immutable';
import { Guid } from '../../../models/Guid';
import { ItemsSyncInfoState } from '../../../models/state/ItemsSyncInfoState';
import { SyncOperation } from '../../../models/enums/SyncOperation';
import { IListItem } from '../../../models/interfaces/IListItem';
import { IItemSyncInfo } from '../../../models/interfaces/IItemSyncInfo';
import { arrayToOrderedMap } from '../../../utils/arrayToOrderedMap';

const requiresSpecialFlag = (oldItemSyncInfo: IItemSyncInfo, newItemSyncInfo: IItemSyncInfo) =>
  oldItemSyncInfo.syncState === SyncState.Desynced
  && (oldItemSyncInfo.operation === SyncOperation.Modify
      || oldItemSyncInfo.operation === SyncOperation.DeleteAfterFailedModify)
  && newItemSyncInfo.operation === SyncOperation.Delete;

const setSyncState = (state: ItemsSyncInfoState, { payload: { itemSyncInfo } }: IAction): ItemsSyncInfoState =>
  itemSyncInfo ?
    state.update(
      itemSyncInfo.id,
      new ItemSyncInfo({
        id: itemSyncInfo.id,
      }),
      syncInfo => syncInfo.with({
        operation: requiresSpecialFlag(syncInfo, itemSyncInfo) ? SyncOperation.DeleteAfterFailedModify : itemSyncInfo.operation,
        syncState: itemSyncInfo.syncState,
      })) :
    state;

const addedItemConfirmed = (state: ItemsSyncInfoState, { payload: { oldId, updatedItem } }: IAction): ItemsSyncInfoState =>
  state
    .set(
      updatedItem.id,
      new ItemSyncInfo({
        id: updatedItem.id,
        syncState: SyncState.Synced,
        operation: SyncOperation.Add,
      }))
    .delete(oldId);

const itemDeleted = (state: ItemsSyncInfoState, { payload: { id } }: IAction): ItemsSyncInfoState =>
  state.delete(id);

const syncAllItems = ({ payload: { items } }: IAction): ItemsSyncInfoState =>
  arrayToOrderedMap(
    items.map(({ id }: IListItem): IItemSyncInfo => ({
      id,
      syncState: SyncState.Synced,
      operation: SyncOperation.Default,
    })),
    ItemSyncInfo,
  );

const revertOperation = (state: ItemsSyncInfoState, { payload: { id } }: IAction): ItemsSyncInfoState =>
  state.update(id, itemSyncInfo => itemSyncInfo.with({
    syncState: SyncState.Synced,
    operation: SyncOperation.Default,
  }));

const revertDeleteAfterFailedModify = (state: ItemsSyncInfoState, { payload: { id } }: IAction): ItemsSyncInfoState =>
  state.update(id, itemSyncInfo => itemSyncInfo.with({
    syncState: SyncState.Desynced,
    operation: SyncOperation.Modify,
  }));

const syncFailed = (state: ItemsSyncInfoState, { payload: { id } }: IAction): ItemsSyncInfoState =>
  state.update(id, itemSyncInfo =>
    itemSyncInfo.with({
      syncState: SyncState.Desynced,
    }));

const initialState: ItemsSyncInfoState = OrderedMap<Guid, ItemSyncInfo>();

export const itemsSyncInfo = (state = initialState, action: IAction): ItemsSyncInfoState => {
  switch (action.type) {
    case ADD_NEW_ITEM_REQUEST:
    case DELETE_ITEM_REQUEST:
    case SAVE_ITEM_CHANGES_REQUEST:
    case SAVE_ITEM_CHANGES_CONFIRM:
      return setSyncState(state, action);
    case ITEM_SYNC_FAILED:
      return syncFailed(state, action);
    case ADD_NEW_ITEM_CONFIRM:
      return addedItemConfirmed(state, action);
    case DELETE_ITEM_CONFIRM:
    case DELETE_UNSAVED_ITEM:
    case REVERT_ADD:
      return itemDeleted(state, action);
    case REVERT_MODIFY:
    case REVERT_DELETE:
      return revertOperation(state, action);
    case REVERT_DELETE_AFTER_MODIFY_FAILED:
      return revertDeleteAfterFailedModify(state, action);
    case RECEIVE_ITEMS:
      return syncAllItems(action);
    default:
      return state;
  }
};
