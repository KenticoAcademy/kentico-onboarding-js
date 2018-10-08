import { IAction } from './IAction';
import {
  SAVE_TEXT_ITEM,
  DELETE_ITEM,
  START_EDIT_ITEM,
  CANCEL_EDIT_ITEM,
} from './actionTypes';

export const saveTextItem = (id: Guid, text: string): IAction => ({
  type: SAVE_TEXT_ITEM,
  payload: {
    id,
    text,
  },
});

export const deleteItem = (id: Guid): IAction => ({
  type: DELETE_ITEM,
  payload: {
    id,
  },
});

export const startEditItem = (id: Guid): IAction => ({
  type: START_EDIT_ITEM,
  payload: {
    id,
  },
});

export const cancelEditItem = (id: Guid): IAction => ({
  type: CANCEL_EDIT_ITEM,
  payload: {
    id,
  },
});
