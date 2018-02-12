import {
  TODO_LIST_ITEM_DELETE,
  TODO_LIST_ITEM_UPDATE,
  TODO_LIST_ITEM_EDIT,
  TODO_LIST_ITEM_CANCEL_EDIT,
  TODO_LIST_ITEM_INSERT,
  NEW_ITEM_PERSISTED,
  UPDATED_ITEM_PERSISTED,
  DELETE_ITEM_SUCCESSFUL,
  ITEM_UPDATE_FAILED,
  DELETE_ITEM_FAILED, CLOSE_ITEM_ERROR
} from '../constants/actionTypes';
import { Uuid } from '../utils/generateId';
import { IAction } from './IAction';

export const insertItem = (args: { text: string, id: Uuid, isSynchronized: boolean }): IAction => ({
  type: TODO_LIST_ITEM_INSERT,
  payload: {
    id: args.id,
    text: args.text,
    isSynchronized: args.isSynchronized
  },
});

export const postSuccess = (args: { newId: Uuid, id: Uuid, text: string, isSynchronized: boolean }): IAction => ({
  type: NEW_ITEM_PERSISTED,
  payload: {
    newId: args.newId,
    id: args.id,
    text: args.text,
    isSynchronized: args.isSynchronized
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
  type: UPDATED_ITEM_PERSISTED,
  payload: {
    id
  }
});

export const putError = (args: { id: Uuid, message: string }): IAction => ({
  type: ITEM_UPDATE_FAILED,
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
  type: DELETE_ITEM_SUCCESSFUL,
  payload: {
    id
  }
});

export const deleteError = (args: { id: Uuid, message: string }): IAction => ({
  type: DELETE_ITEM_FAILED,
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
  type: CLOSE_ITEM_ERROR,
  payload: {
    id,
  }
});

export const fetchError = (errorType: string, errorText: string): IAction => ({
  type: errorType,
  payload: {
    errorText
  }
});
