import {
  TODO_LIST_ITEM_DELETE,
  TODO_LIST_ITEM_UPDATE,
  TODO_LIST_ITEM_EDIT,
  TODO_LIST_ITEM_CANCEL_EDIT,
  APP_FETCH_END,
} from '../constants/actionTypes';
import { generateId, Uuid } from '../utils/generateId';
import { insertItemFactory } from './insertItemFactory';
import { IAction } from './IAction';

export const insertItem = insertItemFactory(generateId);

export const updateItem = (id: Uuid, text: string): IAction => ({
  type: TODO_LIST_ITEM_UPDATE,
  payload: {
    id,
    text,
  },
});

export const deleteItem = (id: Uuid): IAction => ({
  type: TODO_LIST_ITEM_DELETE,
  payload: {
    id,
  },
});

export const editItem = (id: Uuid): IAction => ({
  type: TODO_LIST_ITEM_EDIT,
  payload: {
    id,
  },
});

export const cancelItemEditing = (id: Uuid): IAction => ({
  type: TODO_LIST_ITEM_CANCEL_EDIT,
  payload: {
    id,
  },
});

export const stopFetching = (): IAction => ({
  type: APP_FETCH_END,
  payload: {}
});
