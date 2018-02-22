import { OrderedMap } from 'immutable';
import { ListItem } from '../../../models/classes/ListItem';
import * as ActionTypes from '../../../constants/actionTypes';
import { ItemsState } from '../../../models/state/ItemsState';
import { IAction } from '../../../models/interfaces/IAction';
import { Guid } from '../../../models/Guid';
import { listItemsArrayToOrderedMap } from '../../../utils/listItemsArrayToOrderedMap';
import { SyncOperation } from '../../../models/enums/SyncOperation';

const addNewItem = (state: ItemsState, { payload: { id, text } }: IAction): ItemsState => {
  const newItem = new ListItem({
    id,
    text,
  });

  return state.set(id, newItem);
};

const confirmAddedItem = (state: ItemsState, { payload: { id, newId } }: IAction): ItemsState =>
  state
    .set(
      newId,
      state.get(id).with({
        id: newId,
      }))
    .delete(id);

const deleteItem = (state: ItemsState, { payload: { id } }: IAction): ItemsState =>
  state.delete(id);

const saveItemChanges = (state: ItemsState, { payload: { id, text } }: IAction): ItemsState =>
  state.update(id, item =>
    item.with({
      text,
      isBeingEdited: false,
    }));

const changeItemOpenState = (state: ItemsState, { payload: { id } }: IAction): ItemsState =>
  state.update(id, item =>
    item.with({
      isBeingEdited: !item.isBeingEdited,
    }));

const closeItem = (state: ItemsState, { payload: { id } }: IAction): ItemsState =>
  state.update(id, item =>
    item.with({
      isBeingEdited: false,
    }));

const deleteSyncRequest = (state: ItemsState, { payload: { id, operation } }: IAction): ItemsState => {
  if (operation === SyncOperation.Delete) {
    return state.update(id, item =>
      item.with({
        isBeingEdited: false,
      }));
  }

  return state;
};

const fetchItems = (action: IAction): ItemsState =>
  listItemsArrayToOrderedMap(action.payload.items);

const initialState = OrderedMap<Guid, ListItem>();

export const items = (state = initialState, action: IAction): ItemsState => {
  const { type } = action;

  switch (type) {
    case ActionTypes.ITEM_CREATED:
      return addNewItem(state, action);
    case ActionTypes.ADDED_ITEM_CONFIRMED:
      return confirmAddedItem(state, action);
    case ActionTypes.ITEM_DELETED:
    case ActionTypes.UNSAVED_ITEM_DELETED:
      return deleteItem(state, action);
    case ActionTypes.ITEM_CHANGES_SAVED:
      return saveItemChanges(state, action);
    case ActionTypes.ITEM_OPEN_STATE_CHANGED:
      return changeItemOpenState(state, action);
    case ActionTypes.ITEM_CLOSED:
      return closeItem(state, action);
    case ActionTypes.ITEM_SYNC_REQUESTED:
      return deleteSyncRequest(state, action);
    case ActionTypes.FETCH_ITEMS_SUCCESS:
      return fetchItems(action);
    default:
      return state;
  }
};
