import {
  TODO_LIST_ITEM_EDIT,
  TODO_LIST_ITEM_CANCEL_EDIT,
  CLOSE_PUT_DELETE_ERROR,
  CLOSE_FETCH_ERROR,
  CLOSE_POST_ERROR} from '../constants/actionTypes';
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

export const closeItemError = (id: Uuid): IAction => ({
  type: CLOSE_PUT_DELETE_ERROR,
  payload: {
    id,
  }
});

export const closeFetchError = (): IAction => ({
  type: CLOSE_FETCH_ERROR
});

export const closePostError = (): IAction => ({
  type: CLOSE_POST_ERROR
});
