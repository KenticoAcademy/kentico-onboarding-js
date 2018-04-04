import { OrderedMap } from 'immutable';
import { ListItem } from '../../../models/classes/ListItem';
import * as ActionTypes from '../../../constants/actionTypes';
import { ItemsState } from '../../../models/state/ItemsState';
import { IAction } from '../../../models/interfaces/IAction';
import { Guid } from '../../../models/Guid';
import { arrayToOrderedMap } from '../../../utils/arrayToOrderedMap';
import { IListItem } from '../../../models/interfaces/IListItem';
import { IFetchedItem } from '../../../models/interfaces/IFetchedItem';

const addNewItem = (state: ItemsState, { payload: { id, text } }: IAction): ItemsState => {
  const newItem = new ListItem({
    id,
    text,
  });

  return state.set(id, newItem);
};

const confirmAddedItem = (state: ItemsState, { payload: { oldId, updatedItem } }: IAction): ItemsState =>
  state
    .set(
      updatedItem.id,
      new ListItem({
        ...updatedItem,
        syncedText: updatedItem.text,
      }),
    )
    .delete(oldId);

const deleteItem = (state: ItemsState, { payload: { id } }: IAction): ItemsState =>
  state.delete(id);

const saveItemChanges = (state: ItemsState, { payload: { item } }: IAction): ItemsState =>
  state.update(item.id, originalItem =>
    originalItem.with({
      text: item.text,
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

const fetchItems = (action: IAction): ItemsState => {
  const items: IListItem[] = action.payload.items.map((item: IFetchedItem) => ({
    ...item,
    syncedText: item.text,
  }));

  return arrayToOrderedMap(
    items,
    ListItem
  );
};

const setSyncedText = (state: ItemsState, { payload: { id } }: IAction): ItemsState =>
  state.update(id, item =>
    item.with({
      syncedText: item.text,
    }));

const revertModify = (state: ItemsState, { payload: { id } }: IAction): ItemsState =>
  state.update(id, item =>
    item.with({
      text: item.syncedText,
    }));

const initialState = OrderedMap<Guid, ListItem>();

export const items = (state = initialState, action: IAction): ItemsState => {
  const { type } = action;

  switch (type) {
    case ActionTypes.ITEM_ADD_START:
      return addNewItem(state, action);
    case ActionTypes.ITEM_ADD_SUCCESS:
      return confirmAddedItem(state, action);
    case ActionTypes.ITEM_DELETE_SUCCESS:
    case ActionTypes.UNSAVED_ITEM_DELETE:
    case ActionTypes.ITEM_ADD_REVERT:
      return deleteItem(state, action);
    case ActionTypes.ITEM_UPDATE_START:
      return saveItemChanges(state, action);
    case ActionTypes.ITEM_TOGGLE:
      return changeItemOpenState(state, action);
    case ActionTypes.ITEM_DELETE_START:
      return closeItem(state, action);
    case ActionTypes.ITEM_UPDATE_SUCCESS:
      return setSyncedText(state, action);
    case ActionTypes.ITEM_UPDATE_REVERT:
      return revertModify(state, action);
    case ActionTypes.ITEMS_FETCH_SUCCESS:
      return fetchItems(action);
    default:
      return state;
  }
};
