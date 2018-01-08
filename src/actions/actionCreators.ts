import { IAction } from '../models/IAction';
import * as ActionTypes from '../constants/actionTypes';
import { Guid } from '../models/Guid';
import { IListItem } from '../models/IListItem';

export const addNewItem = ({ id: itemId, text }: { id: Guid, text: string }): IAction => ({
  type: ActionTypes.ITEM_CREATED,
  payload: {
    itemId,
    text,
  },
});

export const openItemForEditing = (itemId: Guid): IAction => ({
  type: ActionTypes.ITEM_OPENED_FOR_EDITING,
  payload: {
    itemId,
  },
});

export const deleteItem = (itemId: Guid): IAction => ({
  type: ActionTypes.ITEM_DELETED,
  payload: {
    itemId,
  },
});

export const saveItemChanges = (itemId: Guid, newText: string): IAction => ({
  type: ActionTypes.ITEM_CHANGES_SAVED,
  payload: {
    itemId,
    newText,
  },
});

export const cancelItemChanges = (itemId: Guid): IAction => ({
  type: ActionTypes.ITEM_CHANGES_CANCELED,
  payload: {
    itemId,
  },
});

export const requestItems = (uri: string): IAction => ({
  type: ActionTypes.FETCH_ITEMS,
  payload: {
    uri,
  }
});

export const receiveItems = (items: IListItem[]): IAction => ({
  type: ActionTypes.FETCH_ITEMS,
  payload: {
    items,
  }
});
