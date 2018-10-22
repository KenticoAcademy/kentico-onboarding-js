import {
  ITEM_STOP_EDITING,
  ITEM_DELETE,
  ITEM_TEXT_UPDATE,
  ITEM_START_EDITING,
} from '../constants/actionTypes';
import { IAction } from './IAction';

export const deleteItem = (id: Uuid): IAction => ({
  type: ITEM_DELETE,
  payload: {
    id,
  },
});

export const updateItemText = (id: Uuid, text: string): IAction => ({
  type: ITEM_TEXT_UPDATE,
  payload: {
    id,
    text,
  },
});

export const startItemEditing = (id: Uuid): IAction => ({
  type: ITEM_START_EDITING,
  payload: {
    id,
  },
});

export const stopItemEditing = (id: Uuid): IAction => ({
  type: ITEM_STOP_EDITING,
  payload: {
    id,
  },
});
