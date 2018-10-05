import { IAction } from './IAction';
import {
  EDIT_TEXT_ITEM,
  DELETE_ITEM,
  START_EDIT_ITEM,
  FINISH_EDIT_ITEM,
} from './actionTypes';

export const editTextItem = (id: Guid, text: string): IAction => ({
  type: EDIT_TEXT_ITEM,
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

export const finishEditItem = (id: Guid): IAction => ({
  type: FINISH_EDIT_ITEM,
  payload: {
    id,
  },
});
