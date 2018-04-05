import { OrderedMap } from 'immutable';
import { ListItem } from '../../../models/classes/ListItem';
import { ItemsState } from '../../../models/state/ItemsState';
import { IAction } from '../../../models/interfaces/IAction';
import { Uuid } from '../../../models/Uuid';
import { arrayToOrderedMap } from '../../../utils/arrayToOrderedMap';
import { IListItem } from '../../../models/interfaces/IListItem';
import { IFetchedItem } from '../../../models/interfaces/IFetchedItem';
import {
  closeItemReducer,
  revertUpdateReducer,
  setSyncedTextReducer,
  toggleItemReducer,
  updateItemReducer,
} from './item';
import {
  ITEM_ADD_REVERT,
  ITEM_ADD_START,
  ITEM_ADD_SUCCESS,
  ITEM_DELETE_START,
  ITEM_DELETE_SUCCESS,
  ITEM_TOGGLE,
  ITEM_UPDATE_REVERT,
  ITEM_UPDATE_START,
  ITEM_UPDATE_SUCCESS,
  ITEMS_FETCH_SUCCESS,
  UNSAVED_ITEM_DELETE,
} from '../../../constants/actionTypes';

const addItem = (state: ItemsState, { payload: { id, text } }: IAction): ItemsState => {
  const newItem = new ListItem({ id, text });

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

const updateItem = (state: ItemsState, { payload: { item } }: IAction): ItemsState =>
  state.update(item.id, originalItem => updateItemReducer(originalItem, item));

const toggleItem = (state: ItemsState, { payload: { id } }: IAction): ItemsState =>
  state.update(id, item => toggleItemReducer(item));

const closeItem = (state: ItemsState, { payload: { id } }: IAction): ItemsState =>
  state.update(id, item => closeItemReducer(item));

const fetchItems = (action: IAction): ItemsState => {
  const items: IListItem[] = action.payload.items.map((item: IFetchedItem) => ({
    ...item,
    syncedText: item.text,
  }));

  return arrayToOrderedMap(
    items,
    ListItem,
  );
};

const setSyncedText = (state: ItemsState, { payload: { id } }: IAction): ItemsState =>
  state.update(id, item => setSyncedTextReducer(item));

const revertUpdate = (state: ItemsState, { payload: { id } }: IAction): ItemsState =>
  state.update(id, item => revertUpdateReducer(item));

const initialState = OrderedMap<Uuid, ListItem>();

export const items = (state = initialState, action: IAction): ItemsState => {
  switch (action.type) {
    case ITEM_ADD_START:
      return addItem(state, action);
    case ITEM_ADD_SUCCESS:
      return confirmAddedItem(state, action);
    case ITEM_DELETE_SUCCESS:
    case UNSAVED_ITEM_DELETE:
    case ITEM_ADD_REVERT:
      return deleteItem(state, action);
    case ITEM_UPDATE_START:
      return updateItem(state, action);
    case ITEM_TOGGLE:
      return toggleItem(state, action);
    case ITEM_DELETE_START:
      return closeItem(state, action);
    case ITEM_UPDATE_SUCCESS:
      return setSyncedText(state, action);
    case ITEM_UPDATE_REVERT:
      return revertUpdate(state, action);
    case ITEMS_FETCH_SUCCESS:
      return fetchItems(action);
    default:
      return state;
  }
};
