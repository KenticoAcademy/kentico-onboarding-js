import axios from 'axios';
import {
  deleteItem, deleteSuccess, insertItem, postSuccess, putSuccess,
  updateItem
} from './actionCreators';
import { generateId } from '../utils/generateId';
import { IAction } from './IAction';
import { deleteItemFactory } from './actionCreatorsFactories/deleteItemFactory';
import { putItemFactory } from './actionCreatorsFactories/putItemFactory';
import { fetchItemsFactory } from './actionCreatorsFactories/fetchItemsFactory';
import { postItemFactory } from './actionCreatorsFactories/postItemFactory';
import { API_URL } from '../constants/apiUrl';
import { getAxiosFactory } from './actionCreatorsFactories/getAxiosFactory';
import { optimisticAddFactory } from './actionCreatorsFactories/optimisticAddFactory';
import { optimisticUpdateFactory } from './actionCreatorsFactories/optimisticUpdateFactory';
import { optimisticDeleteFactory } from './actionCreatorsFactories/optimisticDeleteFactory';

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

export const optimisticAdd = optimisticAddFactory(generateId, insertItem);
export const optimisticUpdate = optimisticUpdateFactory(updateItem);
export const optimisticDelete = optimisticDeleteFactory(deleteItem);
