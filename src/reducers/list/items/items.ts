import { OrderedMap } from 'immutable';
import { ListItem } from '../../../models/classes/ListItem';
import * as ActionTypes from '../../../constants/actionTypes';
import { ItemsState } from '../../../models/state/ItemsState';
import { IAction } from '../../../models/interfaces/IAction';
import { Guid } from '../../../models/Guid';
import { listItemsArrayToOrderedMap } from '../../../utils/listItemsArrayToOrderedMap';

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
      new ListItem(updatedItem),
    )
    .delete(oldId);

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

const fetchItems = (action: IAction): ItemsState =>
  listItemsArrayToOrderedMap(action.payload.items);

const initialState = OrderedMap<Guid, ListItem>();

export const items = (state = initialState, action: IAction): ItemsState => {
  const { type } = action;

  switch (type) {
    case ActionTypes.ADD_NEW_ITEM_REQUEST:
      return addNewItem(state, action);
    case ActionTypes.ADD_NEW_ITEM_CONFIRM:
      return confirmAddedItem(state, action);
    case ActionTypes.DELETE_ITEM_CONFIRM:
    case ActionTypes.DELETE_UNSAVED_ITEM:
      return deleteItem(state, action);
    case ActionTypes.SAVE_ITEM_CHANGES_REQUEST:
      return saveItemChanges(state, action);
    case ActionTypes.CHANGE_ITEM_OPEN_STATE:
      return changeItemOpenState(state, action);
    case ActionTypes.DELETE_ITEM_REQUEST:
      return closeItem(state, action);
    case ActionTypes.RECEIVE_ITEMS:
      return fetchItems(action);
    default:
      return state;
  }
};
