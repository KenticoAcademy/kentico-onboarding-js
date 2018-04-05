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
import {
  desyncItemReducer,
  revertDeleteAfterFailedUpdateReducer,
  revertOperationReducer,
  setSyncStateReducer,
} from './syncInfo';

const setSyncState = (state: ItemsSyncInfoState, { payload: { itemSyncInfo } }: IAction): ItemsSyncInfoState =>
  itemSyncInfo ?
    state.update(
      itemSyncInfo.id,
      new ItemSyncInfo({
        id: itemSyncInfo.id,
      }),
      syncInfo => setSyncStateReducer(syncInfo, itemSyncInfo)) :
    state;

const confirmAddedItem = (state: ItemsSyncInfoState, { payload: { oldId, updatedItem } }: IAction): ItemsSyncInfoState =>
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
  state.update(id, itemSyncInfo => revertOperationReducer(itemSyncInfo));

const revertDeleteAfterFailedUpdate = (state: ItemsSyncInfoState, { payload: { id } }: IAction): ItemsSyncInfoState =>
  state.update(id, itemSyncInfo => revertDeleteAfterFailedUpdateReducer(itemSyncInfo));

const desyncItem = (state: ItemsSyncInfoState, { payload: { id } }: IAction): ItemsSyncInfoState =>
  state.update(id, itemSyncInfo => desyncItemReducer(itemSyncInfo));

const initialState: ItemsSyncInfoState = OrderedMap<Uuid, ItemSyncInfo>();

export const itemsSyncInfo = (state = initialState, action: IAction): ItemsSyncInfoState => {
  switch (action.type) {
    case ITEM_ADD_START:
    case ITEM_DELETE_START:
    case ITEM_UPDATE_START:
    case ITEM_UPDATE_SUCCESS:
      return setSyncState(state, action);
    case ITEM_SYNC_FAILED:
      return desyncItem(state, action);
    case ITEM_ADD_SUCCESS:
      return confirmAddedItem(state, action);
    case ITEM_DELETE_SUCCESS:
    case UNSAVED_ITEM_DELETE:
    case ITEM_ADD_REVERT:
      return itemDeleted(state, action);
    case ITEM_UPDATE_REVERT:
    case ITEM_DELETE_REVERT:
      return revertOperation(state, action);
    case ITEM_DELETE_AFTER_UPDATE_REVERT:
      return revertDeleteAfterFailedUpdate(state, action);
    case ITEMS_FETCH_SUCCESS:
      return syncAllItems(action);
    default:
      return state;
  }
};
