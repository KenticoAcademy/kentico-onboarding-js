import {
  TODO_LIST_ITEM_EDIT,
  TODO_LIST_ITEM_CANCEL_EDIT,
  ITEM_ERROR_CLOSE,
  ITEMS_FETCH_ERROR_CLOSE,
  ITEM_INSERT_ERROR_CLOSE,
  ITEMS_FETCH_STARTED
} from '../constants/actionTypes';
import { Uuid } from '../utils/generateId';
import { IAction } from './IAction';

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

export const closeItemError = (id: Uuid, errorId: Uuid): IAction => ({
  type: ITEM_ERROR_CLOSE,
  payload: {
    id,
    errorId
  }
});

export const closeFetchError = (): IAction => ({
  type: ITEMS_FETCH_ERROR_CLOSE
});

export const closePostError = (): IAction => ({
  type: ITEM_INSERT_ERROR_CLOSE
});

export const startFetching = (): IAction => ({
  type: ITEMS_FETCH_STARTED
});
