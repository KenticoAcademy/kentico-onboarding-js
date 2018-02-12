import axios from 'axios';
import {
  deleteItem,
  deleteSuccess,
  insertItem, deleteError,
  putError,
  postSuccess,
  putSuccess,
  updateItem,
  fetchError, postError, fetchSuccess
} from './actionCreators';
import { generateId } from '../utils/generateId';
import { deleteItemFactory } from './actionCreatorsFactories/deleteItemFactory';
import { putItemFactory } from './actionCreatorsFactories/putItemFactory';
import { fetchItemsFactory } from './actionCreatorsFactories/fetchItemsFactory';
import { postItemFactory } from './actionCreatorsFactories/postItemFactory';
import { API_URL } from '../constants/connection';
import { getAxiosFactory } from './actionCreatorsFactories/getAxiosFactory';
import { optimisticAddFactory } from './actionCreatorsFactories/optimisticAddFactory';
import { optimisticUpdateFactory } from './actionCreatorsFactories/optimisticUpdateFactory';
import { optimisticDeleteFactory } from './actionCreatorsFactories/optimisticDeleteFactory';

const getAxios = getAxiosFactory(axios, API_URL);

const postItem = postItemFactory(
  {
    deleteSuccess,
    postSuccess,
    postError,
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

export const fetchItems = fetchItemsFactory(
  {
    insertItem,
    fetchSuccess,
    fetchError,
    getAxios
  });

export const optimisticAdd = optimisticAddFactory(generateId, insertItem, postItem);
export const optimisticUpdate = optimisticUpdateFactory(updateItem, putItem);
export const optimisticDelete = optimisticDeleteFactory(deleteItem, deleteFromServer);
