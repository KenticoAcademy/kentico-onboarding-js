import axios from 'axios';
import {
  TODO_LIST_ITEM_DELETE,
  TODO_LIST_ITEM_UPDATE,
  TODO_LIST_ITEM_EDIT,
  TODO_LIST_ITEM_CANCEL_EDIT,
  TODO_LIST_ITEM_INSERT,
  ITEM_PERSISTED
} from '../constants/actionTypes';
import { generateId, Uuid } from '../utils/generateId';
import { IAction } from './IAction';
import { postItemFactory } from './postItemFactory';
import { fetchItemsFactory } from './fetchItemsFactory';
import { API_URL } from '../constants/apiUrl';
import { putItemFactory } from './putItemFactory';
import { deleteItemFactory } from './deleteItemFactory';
import { getAxiosFactory } from './getAxiosFactory';
import { IAppState } from '../models/IAppState';
import { Dispatch } from 'react-redux';

export const insertItem = (args: { text: string, id: Uuid, isSynchronized: boolean }): IAction => ({
  type: TODO_LIST_ITEM_INSERT,
  payload: {
    id: args.id,
    text: args.text,
    isSynchronized: args.isSynchronized
  },
});

export const updateItem = (args: { newId: Uuid, id: Uuid, text: string, isSynchronized: boolean }): IAction => ({
  type: TODO_LIST_ITEM_UPDATE,
  payload: {
    newId: args.newId,
    id: args.id,
    text: args.text,
    isSynchronized: args.isSynchronized
  },
});

export const postSuccess = (args: {newId: Uuid, id: Uuid, text: string, isSynchronized: boolean}): IAction => ({
  type: ITEM_PERSISTED,
  payload: {
    newId: args.newId,
    id: args.id,
    text: args.text,
    isSynchronized: args.isSynchronized
  }
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
    postSuccess,
    apiCallSuccess,
    apiCallError,
    getAxios
  });

export const optimisticAdd = (text: string) =>
  (dispatch: Dispatch<IAppState>): any => {
    const tempId = generateId();
    dispatch(insertItem({
      text,
      id: tempId,
      isSynchronized: false
    }));
    return dispatch(postItem(tempId, text))
      .then()
      .catch();
  };

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
