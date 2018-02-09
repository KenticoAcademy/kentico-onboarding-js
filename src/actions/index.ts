import axios from 'axios';
import {
  deleteItem,
  deleteSuccess,
  insertItem, deleteError,
  putError,
  postSuccess,
  putSuccess,
  updateItem,
  fetchError
} from './actionCreators';
import { generateId } from '../utils/generateId';
import { IAction } from './IAction';
import { deleteItemFactory } from './actionCreatorsFactories/deleteItemFactory';
import { putItemFactory } from './actionCreatorsFactories/putItemFactory';
import { fetchItemsFactory } from './actionCreatorsFactories/fetchItemsFactory';
import { postItemFactory } from './actionCreatorsFactories/postItemFactory';
import { API_URL } from '../constants/connection';
import { getAxiosFactory } from './actionCreatorsFactories/getAxiosFactory';
import { optimisticAddFactory } from './actionCreatorsFactories/optimisticAddFactory';
import { optimisticUpdateFactory } from './actionCreatorsFactories/optimisticUpdateFactory';
import { optimisticDeleteFactory } from './actionCreatorsFactories/optimisticDeleteFactory';
import { ITEMS_FETCH_SUCCESS } from '../constants/actionTypes';

export const apiCallSuccess = (callType: string): IAction => ({
  type: callType,
  payload: undefined
});

export const fetchSuccess = (): IAction => ({
  type: ITEMS_FETCH_SUCCESS,
  payload: undefined
});

const getAxios = getAxiosFactory(axios, API_URL);

const postItem = postItemFactory(
  {
    deleteSuccess,
    postSuccess,
    apiCallError: fetchError,
    getAxios
  });

export const fetchItems = fetchItemsFactory(
  {
    insertItem,
    fetchSuccess,
    fetchError,
    getAxios
  });

const putItem = putItemFactory(
  {
    putSuccess,
    putError,
    getAxios
  });

const deleteFromServer = deleteItemFactory(
  {
    deleteSuccess,
    deleteError,
    getAxios
  }
);

export const optimisticAdd = optimisticAddFactory(generateId, insertItem, postItem);
export const optimisticUpdate = optimisticUpdateFactory(updateItem, putItem);
export const optimisticDelete = optimisticDeleteFactory(deleteItem, deleteFromServer);
