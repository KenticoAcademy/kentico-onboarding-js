import axios, {
  AxiosResponse,
  AxiosError,
  AxiosStatic
} from 'axios';
import {
  TODO_LIST_ITEM_DELETE,
  TODO_LIST_ITEM_UPDATE,
  TODO_LIST_ITEM_EDIT,
  TODO_LIST_ITEM_CANCEL_EDIT,
  TODO_LIST_ITEM_INSERT,
  ITEMS_FETCH_ERROR,
  ITEMS_FETCH_SUCCESS, ITEM_POST_SUCCESS, ITEM_POST_ERROR,
} from '../constants/actionTypes';
import { Uuid } from '../utils/generateId';
import { IAction } from './IAction';
import { IAppState } from '../models/IAppState';
import { Dispatch } from 'react-redux';
import { isUndefined } from 'util';

// export const insertItem = insertItemFactory(generateId);

interface FetchedItem {
  Text: string;
  Id: Uuid;
}

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

export const postItemFactory = (axios: AxiosStatic) => (text: string) =>
  (dispatch: Dispatch<IAppState>, _getState: () => IAppState, url: string) =>
    axios.post(url, {Text: text})
      .then((response: AxiosResponse) =>
        dispatch(insertItem(
          response.data.Text,
          response.data.Id)))
      .then(() => dispatch(setCallSuccess(ITEM_POST_SUCCESS)))
      .catch((error: AxiosError) => {
        const errorResponse = error.response;
        if (!isUndefined(errorResponse)) {
          dispatch(setCallError(ITEM_POST_ERROR, errorResponse.status + ' ' + errorResponse.statusText));
        }
      });

export const fetchItemsFactory = (axios: AxiosStatic) => () =>
  (dispatch: Dispatch<IAppState>, _getState: () => IAppState, url: string) =>
    axios.get(url)
      .then((response: AxiosResponse) => response.data.map((item: FetchedItem) =>
        dispatch(insertItem(item.Text, item.Id))))
      .then(() => dispatch(setCallSuccess(ITEMS_FETCH_SUCCESS)))
      .catch((error: AxiosError) => {
        const errorResponse = error.response;
        if (!isUndefined(errorResponse)) {
          dispatch(setCallError(ITEMS_FETCH_ERROR, errorResponse.status + ' ' + errorResponse.statusText));
        }
      });

export const postItem = postItemFactory(axios);
export const fetchItems = fetchItemsFactory(axios);
