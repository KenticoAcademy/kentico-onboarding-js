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
} from '../../../constants/actionTypes';
import { SyncState } from '../../../models/enums/SyncState';
import { ItemSyncInfo } from '../../../models/classes/ItemSyncInfo';
import { OrderedMap } from 'immutable';
import { Guid } from '../../../models/Guid';
import { ItemsSyncInfoState } from '../../../models/state/ItemsSyncInfoState';
import { SyncOperation } from '../../../models/enums/SyncOperation';
import { itemSyncInfoArrayToOrderedMap } from '../../../utils/itemSyncInfoArrayToOrderedMap';
import { IListItem } from '../../../models/interfaces/IListItem';
import { IItemSyncInfo } from '../../../models/interfaces/IItemSyncInfo';

const setSyncState = (state: ItemsSyncInfoState, { payload: { itemSyncInfo } }: IAction): ItemsSyncInfoState =>
  itemSyncInfo ?
    state.update(
      itemSyncInfo.id,
      new ItemSyncInfo({
        id: itemSyncInfo.id,
      }),
      syncInfo => syncInfo.with({
        operation: itemSyncInfo.operation,
        syncState: itemSyncInfo.syncState,
      })) :
    state;

const addedItemConfirmed = (state: ItemsSyncInfoState, { payload: { id, newId } }: IAction): ItemsSyncInfoState =>
  state
    .set(
      newId,
      state.get(id).with({
        id: newId,
        syncState: SyncState.Synced,
      }))
    .delete(id);

const itemDeleted = (state: ItemsSyncInfoState, { payload: { id } }: IAction): ItemsSyncInfoState =>
  state.delete(id);

const syncAllItems = ({ payload: { items } }: IAction): ItemsSyncInfoState =>
  itemSyncInfoArrayToOrderedMap(items.map(({ id }: IListItem): IItemSyncInfo => ({
    id,
    syncState: SyncState.Synced,
    operation: SyncOperation.Default,
  })));

const syncFailed = (state: ItemsSyncInfoState, { payload: { id } }: IAction): ItemsSyncInfoState =>
  state.update(id, itemSyncInfo =>
    itemSyncInfo.with({
      syncState: SyncState.Unsynced,
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
      return itemDeleted(state, action);
    case RECEIVE_ITEMS:
      return syncAllItems(action);
    default:
      return state;
  }
};
