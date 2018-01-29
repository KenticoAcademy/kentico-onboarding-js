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
import { API_URL } from '../constants/apiUrl';
import { putItemFactory } from './putItemFactory';
import { deleteItemFactory } from './deleteItemFactory';
import { getAxiosFactory } from './getAxiosFactory';

export const insertItem = (args: { text: string, id: Uuid }): IAction => ({
  type: TODO_LIST_ITEM_INSERT,
  payload: {
    id: args.id,
    text: args.text,
  },
});

export const updateItem = (args: { id: Uuid, text: string }): IAction => ({
  type: TODO_LIST_ITEM_UPDATE,
  payload: {
    id: args.id,
    text: args.text,
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

export const apiCallError = (errorType: string, errorText: string): IAction => ({
  type: errorType,
  payload: {
    errorText
  }
});

export const apiCallSuccess = (callType: string): IAction => ({
  type: callType,
  payload: undefined
});

const getAxios = getAxiosFactory(axios, API_URL);

export const postItem = postItemFactory(
  {
    insertItem,
    apiCallSuccess,
    apiCallError,
    getAxios
  });

export const fetchItems = fetchItemsFactory(
  {
    insertItem,
    apiCallSuccess,
    apiCallError,
    getAxios
  });

export const putItem = putItemFactory(
  {
    updateItem,
    apiCallSuccess,
    apiCallError,
    getAxios
  });

export const deleteIt = deleteItemFactory(
  {
    deleteItem,
    apiCallSuccess,
    apiCallError,
    getAxios
  }
);
