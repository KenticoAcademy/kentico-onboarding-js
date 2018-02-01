import axios from 'axios';
import {
  deleteItem, deleteSuccess, insertItem, postSuccess, putSuccess,
  updateItem
} from './actionCreators';
import { generateId, Uuid } from '../utils/generateId';
import { IAppState } from '../models/IAppState';
import { Dispatch } from 'react-redux';
import { IAction } from './IAction';
import { deleteItemFactory } from './actionCreatorsFactories/deleteItemFactory';
import { putItemFactory } from './actionCreatorsFactories/putItemFactory';
import { fetchItemsFactory } from './actionCreatorsFactories/fetchItemsFactory';
import { postItemFactory } from './actionCreatorsFactories/postItemFactory';
import { API_URL } from '../constants/apiUrl';
import { getAxiosFactory } from './actionCreatorsFactories/getAxiosFactory';

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
    putSuccess,
    apiCallError,
    getAxios
  });

export const deleteIt = deleteItemFactory(
  {
    deleteSuccess,
    apiCallError,
    getAxios
  }
);

export const optimisticAddFactory = (generateId: () => Uuid, insertItemToList: any) =>
  (text: string) =>
    (dispatch: Dispatch<IAppState>): Promise<void | IAction> => {
      const tempId = generateId();
      dispatch(insertItemToList({
        text,
        id: tempId,
        isSynchronized: false
      }));
      return dispatch(postItem(tempId, text));
    };

export const optimisticUpdateFactory = (updateItemInList: any) => (id: Uuid, text: string) =>
  (dispatch: Dispatch<IAppState>): Promise<void | IAction> => {
    dispatch(updateItemInList({
      id,
      text
    }));
    return dispatch(putItem(id, text));
  };

export const optimisticDeleteFactory = (deleteItemFromList: any) => (id: Uuid) =>
  (dispatch: Dispatch<IAppState>): any => {
    dispatch(deleteItemFromList(id));
    return dispatch(deleteIt(id));
  };

export const optimisticAdd = optimisticAddFactory(generateId, insertItem);
export const optimisticUpdate = optimisticUpdateFactory(updateItem);
export const optimisticDelete = optimisticDeleteFactory(deleteItem);
