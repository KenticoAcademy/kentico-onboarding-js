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

export const setFetchError = (errorText: string): IAction => ({
  type: ITEMS_FETCH_ERROR,
  payload: {
    errorText
  }
});

export const setFetchSuccess = (): IAction => ({
  type: ITEMS_FETCH_SUCCESS,
  payload: {}
});

export const setPostSuccess = (): IAction => ({
  type: ITEM_POST_SUCCESS,
  payload: {}
});

export const setPostError = (errorText: string): IAction => ({
  type: ITEM_POST_ERROR,
  payload: {
    errorText
  }
});

const postItemFactory = (axios: AxiosStatic) => (text: string) =>
  (dispatch: Dispatch<IAppState>, _getState: () => IAppState, url: string) => {
    return axios.post(url, {Text: text})
      .then((response: AxiosResponse) => dispatch(insertItem(
        response.data.Text,
        response.data.Id)))
      .then(() => dispatch(setPostSuccess()))
      .catch((error: AxiosError) => {
        const errorResponse = error.response;
        if (!isUndefined(errorResponse)) {
          dispatch(setPostError(errorResponse.status + ' ' + errorResponse.statusText));
        }
      });
  };

export const fetchItemsFactory = (axios: AxiosStatic) => () =>
  (dispatch: Dispatch<IAppState>, _getState: () => IAppState, url: string) => {
    return axios.get(url)
      .then((response: AxiosResponse) => response.data.map((item: FetchedItem) =>
        dispatch(insertItem(item.Text, item.Id))))
      .then(() => dispatch(setFetchSuccess()))
      .catch((error: AxiosError) => {
        const errorResponse = error.response;
        if (!isUndefined(errorResponse)) {
          dispatch(setFetchError(errorResponse.status + ' ' + errorResponse.statusText));
        }
      });
  };

export const postItem = postItemFactory(axios);
export const fetchItems = fetchItemsFactory(axios);
