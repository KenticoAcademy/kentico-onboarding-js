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

interface ErrorActionArgs {
  id: Uuid;
  message: string;
}

export const insertItem =
  (args: { text: string, id: Uuid, isSynchronized: boolean }): IAction => ({
    type: TODO_LIST_ITEM_INSERT,
    payload: {
      id: args.id,
      text: args.text,
      isSynchronized: args.isSynchronized
    },
  });

export const postSuccess =
  (args: { newId: Uuid, id: Uuid, text: string, isSynchronized: boolean }): IAction => ({
    type: POST_ITEM_SUCCESS,
    payload: {
      newId: args.newId,
      id: args.id,
      text: args.text,
      isSynchronized: args.isSynchronized
    }
  });

export const postError = (id: Uuid, errorMessage: string): IAction => ({
  type: POST_ITEM_ERROR,
  payload: {
    id,
    errorMessage
  }
});

export const updateItem = (args: { id: Uuid, text: string }): IAction => ({
  type: TODO_LIST_ITEM_UPDATE,
  payload: {
    id: args.id,
    text: args.text
  },
});

export const putSuccess = (id: Uuid): IAction => ({
  type: PUT_ITEM_SUCCESS,
  payload: {
    id
  }
});

export const putError = (args: ErrorActionArgs): IAction => ({
  type: PUT_ITEM_ERROR,
  payload: {
    id: args.id,
    message: args.message
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

export const deleteError = (args: ErrorActionArgs): IAction => ({
  type: DELETE_ITEM_ERROR,
  payload: {
    id: args.id,
    message: args.message
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
