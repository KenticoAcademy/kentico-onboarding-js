import {
  TODO_LIST_ITEM_DELETE,
  TODO_LIST_ITEM_UPDATE,
  TODO_LIST_ITEM_EDIT,
  TODO_LIST_ITEM_CANCEL_EDIT,
  APP_FETCH_END, TODO_LIST_ITEM_INSERT,
} from '../constants/actionTypes';
import { Uuid } from '../utils/generateId';
import { IAction } from './IAction';

// export const insertItem = insertItemFactory(generateId);

export const insertItem = (text: string, id: Uuid) => ({
  type: TODO_LIST_ITEM_INSERT,
  payload: {
    id,
    text,
  },
});

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
