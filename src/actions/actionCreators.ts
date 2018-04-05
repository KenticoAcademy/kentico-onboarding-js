import {
  TODO_LIST_ITEM_DELETE,
  TODO_LIST_ITEM_UPDATE,
  TODO_LIST_ITEM_EDIT,
  TODO_LIST_ITEM_CANCEL_EDIT,
  TODO_LIST_ITEM_INSERT,
  POST_ITEM_SUCCESS,
  PUT_ITEM_SUCCESS,
  DELETE_ITEM_SUCCESS,
  PUT_ITEM_ERROR,
  DELETE_ITEM_ERROR,
  CLOSE_PUT_DELETE_ERROR,
  POST_ITEM_ERROR,
  FETCH_ITEMS_SUCCESS,
  CLOSE_FETCH_ERROR,
  CLOSE_POST_ERROR,
  FETCH_ITEMS_ERROR
} from '../constants/actionTypes';
import { Uuid } from '../utils/generateId';
import { IAction } from './IAction';
import { UpdateItem } from './actionCreatorsFactories/putItemFactory';

export const insertItem =
  (item: {text: string, id: Uuid, isSynchronized: boolean}): IAction => ({
    type: TODO_LIST_ITEM_INSERT,
    payload: item,
  });

export const postSuccess =
  (newId: Uuid, item: {id: Uuid, text: string, isSynchronized: boolean}): IAction => ({
    type: POST_ITEM_SUCCESS,
    payload: {
      newId,
      ...item
    }
  });

export const postError = (id: Uuid, message: string): IAction => ({
  type: POST_ITEM_ERROR,
  payload: {
    id,
    message
  }
});

export const updateItem = (item: UpdateItem): IAction => ({
  type: TODO_LIST_ITEM_UPDATE,
  payload: item,
});

export const putSuccess = (id: Uuid): IAction => ({
  type: PUT_ITEM_SUCCESS,
  payload: {
    id
  }
});

export const putError = (id: Uuid, message: string): IAction => ({
  type: PUT_ITEM_ERROR,
  payload: {
    id,
    message
  }
});

export const deleteItem = (id: Uuid): IAction => ({
  type: TODO_LIST_ITEM_DELETE,
  payload: {
    id,
  },
});

export const deleteSuccess = (id: Uuid): IAction => ({
  type: DELETE_ITEM_SUCCESS,
  payload: {
    id
  }
});

export const deleteError = (id: Uuid, message: string): IAction => ({
  type: DELETE_ITEM_ERROR,
  payload: {
    id,
    message
  }
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

export const closeItemError = (id: Uuid): IAction => ({
  type: CLOSE_PUT_DELETE_ERROR,
  payload: {
    id,
  }
});

export const fetchSuccess = (): IAction => ({
  type: FETCH_ITEMS_SUCCESS
});

export const fetchError = (errorText: string): IAction => ({
  type: FETCH_ITEMS_ERROR,
  payload: {
    errorText
  }
});

export const closeFetchError = (): IAction => ({
  type: CLOSE_FETCH_ERROR
});

export const closePostError = (): IAction => ({
  type: CLOSE_POST_ERROR
});
