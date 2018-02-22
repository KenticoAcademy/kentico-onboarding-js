import { IAction } from '../../../models/interfaces/IAction';
import {
  ADDED_ITEM_CONFIRMED,
  FETCH_ITEMS_SUCCESS,
  ITEM_DELETED,
  ITEM_SYNC_FAILED,
  ITEM_SYNC_REQUESTED,
  ITEM_SYNC_SUCCEEDED,
  UNSAVED_ITEM_DELETED,
} from '../../../constants/actionTypes';
import { SyncState } from '../../../models/enums/SyncState';
import { ItemSyncInfo } from '../../../models/classes/ItemSyncInfo';
import { OrderedMap } from 'immutable';
import { Guid } from '../../../models/Guid';
import { ItemsSyncInfoState } from '../../../models/state/ItemsSyncInfoState';
import { SyncOperation } from '../../../models/enums/SyncOperation';
import { itemSyncInfoArrayToOrderedMap } from '../../../utils/itemSyncInfoArrayToOrderedMap';
import { IListItem } from '../../../models/interfaces/IListItem';

const setSyncState = (state: ItemsSyncInfoState, { payload: { itemSyncInfo: { id, operation, state: syncState } } }: IAction): ItemsSyncInfoState =>
  state.update(
    id,
    new ItemSyncInfo({
      id,
    }),
    syncInfo => syncInfo.with({
      operation,
      state: syncState,
    })
  );

const addedItemConfirmed = (state: ItemsSyncInfoState, { payload: { id, newId } }: IAction): ItemsSyncInfoState =>
  state
    .set(
      newId,
      state.get(id).with({
        id: newId,
        state: SyncState.Synced,
      }))
    .delete(id);

const itemDeleted = (state: ItemsSyncInfoState, { payload: { id } }: IAction): ItemsSyncInfoState =>
  state.delete(id);

const syncAllItems = ({ payload: { items } }: IAction): ItemsSyncInfoState =>
  itemSyncInfoArrayToOrderedMap(items.map(({ id }: IListItem) =>
    new ItemSyncInfo({
      id,
      state: SyncState.Synced,
      operation: SyncOperation.Fetch,
    })
  ));

const initialState: ItemsSyncInfoState = OrderedMap<Guid, ItemSyncInfo>();

export const itemsSyncInfo = (state = initialState, action: IAction): ItemsSyncInfoState => {
  switch (action.type) {
    case ITEM_SYNC_REQUESTED:
    case ITEM_SYNC_FAILED:
    case ITEM_SYNC_SUCCEEDED:
      return setSyncState(state, action);
    case ADDED_ITEM_CONFIRMED:
      return addedItemConfirmed(state, action);
    case ITEM_DELETED:
    case UNSAVED_ITEM_DELETED:
      return itemDeleted(state, action);
    case FETCH_ITEMS_SUCCESS:
      return syncAllItems(action);
    default:
      return state;
  }
};
