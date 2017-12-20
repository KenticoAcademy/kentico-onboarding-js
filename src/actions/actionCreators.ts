import { IAction } from '../interfaces/IAction';
import * as ActionTypes from '../constants/actionTypes';

export const openItemForEditing = (itemId: string): IAction => ({
  type: ActionTypes.ITEM_OPENED_FOR_EDITING,
  payload: {
    itemId,
  },
});

export const deleteItem = (itemId: string): IAction => ({
  type: ActionTypes.ITEM_DELETED,
  payload: {
    itemId,
  },
});

export const saveItemChanges = (itemId: string, newText: string): IAction => ({
  type: ActionTypes.ITEM_CHANGES_SAVED,
  payload: {
    itemId,
    newText,
  },
});

export const cancelItemChanges = (itemId: string): IAction => ({
  type: ActionTypes.ITEM_CHANGES_CANCELED,
  payload: {
    itemId,
  },
});
