import { OrderedMap } from 'immutable';
import { ListItem } from '../../../models/ListItem';
import * as ActionTypes from '../../../constants/actionTypes';
import { IItemsState } from '../../../interfaces/IItemsState';
import { IAction } from '../../../interfaces/IAction';


const addNewItem = (state: IItemsState, action: IAction) => {
  const { itemId: id, text } = action.payload;

  const newItem = new ListItem({
    id,
    text,
  });

  return state.set(id, newItem);
};

const deleteItem = (state: IItemsState, action: IAction) => {
  const { itemId } = action.payload;

  return state.delete(itemId);
};

const saveItemChanges = (state: IItemsState, action: IAction) => {
  const { itemId, newText } = action.payload;

  return state.update(itemId, item =>
    item.with({
      text: newText,
      isBeingEdited: false,
    }));
};

const openItemForEditing = (state: IItemsState, action: IAction) => {
  const { itemId } = action.payload;

  return state.update(itemId, item =>
    item.with({
      isBeingEdited: true,
    }));
};

const cancelItemChanges = (state: IItemsState, action: IAction) => {
  const { itemId } = action.payload;

  return state.update(itemId, item =>
    item.with({
      isBeingEdited: false,
    }));
};

const initialState = OrderedMap<string, ListItem>();

export const items = (state = initialState, action: IAction) => {
  const { type } = action;

  switch (type) {
    case ActionTypes.ITEM_CREATED:
      return addNewItem(state, action);
    case ActionTypes.ITEM_DELETED:
      return deleteItem(state, action);
    case ActionTypes.ITEM_CHANGES_SAVED:
      return saveItemChanges(state, action);
    case ActionTypes.ITEM_OPENED_FOR_EDITING:
      return openItemForEditing(state, action);
    case ActionTypes.ITEM_CHANGES_CANCELED:
      return cancelItemChanges(state, action);
    default:
      return state;
  }
};
