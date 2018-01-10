import {
  TODO_LIST_ITEM_DELETE,
  TODO_LIST_ITEM_UPDATE,
  TODO_LIST_ITEM_EDIT,
  TODO_LIST_ITEM_CANCEL_EDIT,
  TODO_LIST_ITEM_INSERT,
  APP_FETCH_ERROR,
  APP_FETCH_SUCCESS, APP_POST_SUCCESS, APP_POST_ERROR,
} from '../constants/actionTypes';
import axios from 'axios';
import { Uuid } from '../utils/generateId';
import { IAction } from './IAction';
import { IAppState } from '../models/IAppState';
import { Dispatch } from 'react-redux';

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
  type: APP_FETCH_ERROR,
  payload: {
    errorText
  }
});

export const setFetchSuccess = (): IAction => ({
  type: APP_FETCH_SUCCESS,
  payload: {}
});

export const setPostSuccess = (): IAction => ({
  type: APP_POST_SUCCESS,
  payload: {}
});

export const setPostError = (errorText: string): IAction => ({
  type: APP_POST_ERROR,
  payload: {
    errorText
  }
});

export const postItem = (text: string) =>
  (dispatch: Dispatch<IAppState>, _getState: () => IAppState, url: string) => {
    axios.post(url, {Text: text})
      .then(item => dispatch(insertItem(
        item.data.Text,
        item.data.Id)))
      .then(() => dispatch(setPostSuccess()))
      .catch(error => {
        dispatch(setPostError(error.response.status + ' ' + error.response.statusText));
      });
  };

export const fetchItems = () =>
  (dispatch: Dispatch<IAppState>, _getState: () => IAppState, url: string) => {
    axios.get(url)
      .then(response => response.data.map((item: FetchedItem) =>
        dispatch(insertItem(item.Text, item.Id))))
      .then(() => dispatch(setFetchSuccess()))
      .catch(error => {
        dispatch(setFetchError(error.response.status + ' ' + error.response.statusText));
      });
  };
