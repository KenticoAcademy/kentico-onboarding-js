import { actionTypes } from '../constants/actionTypes';
import { IAction } from './IAction';
import { ItemId } from '../models/ItemId';

export const deleteItem = (id: ItemId): IAction => ({
  type: actionTypes.DELETE_ITEM,
  payload: {id},
});

export const toggleEditing = (id: ItemId): IAction => ({
  type: actionTypes.TOGGLE_EDITING,
  payload: {id},
});

export const updateItemText = (id: ItemId): IAction => ({
  type: actionTypes.UPDATE_ITEM,
  payload: {id},
});

export const updateNewItemText = (newItemText: string): IAction => ({
  type: actionTypes.UPDATE_NEW_ITEM,
  payload: {newItemText},
});

export const textUpdateChange = (id: ItemId, updatedText: string): IAction => ({
  type: actionTypes.EDIT_ITEM_TEXT,
  payload: {
    id,
    updatedText
  },
});

export const toggleSynchronized = (id: ItemId, synchronized: boolean): IAction => ({
  type: actionTypes.TOGGLE_SYNCHRONIZED,
  payload: {
    id,
    synchronized,
  },
});

export const synchronizeItemId = (oldId: ItemId, newId: ItemId) => ({
  type: actionTypes.SYNCHRONIZE_ITEM_ID,
  payload: {
    oldId,
    newId
  }
});
