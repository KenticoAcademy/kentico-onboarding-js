import { IAction } from '../models/IAction';
import * as ActionTypes from '../constants/actionTypes';
import { Guid } from '../models/Guid';

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
