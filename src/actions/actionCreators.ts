import axios from 'axios';
import {
  TODO_LIST_ITEM_DELETE,
  TODO_LIST_ITEM_UPDATE,
  TODO_LIST_ITEM_EDIT,
  TODO_LIST_ITEM_CANCEL_EDIT,
  TODO_LIST_ITEM_INSERT,
} from '../constants/actionTypes';
import { Uuid } from '../utils/generateId';
import { IAction } from './IAction';
import { postItemFactory } from './postItemFactory';
import { fetchItemsFactory } from './fetchItemsFactory';

// export const insertItem = insertItemFactory(generateId);

export const insertItem = (text: string, id: Uuid): IAction => ({
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

export const setCallError = (errorType: string, errorText: string): IAction => ({
  type: errorType,
  payload: {
    errorText
  }
});

export const setCallSuccess = (callType: string): IAction => ({
  type: callType,
  payload: {}
});

export const postItem = postItemFactory(
  {
    insertItem,
    setCallSuccess,
    setCallError
  },
  axios);

export const fetchItems = fetchItemsFactory(
  {
    insertItem,
    setCallSuccess,
    setCallError
  },
  axios);
