import axios from 'axios';
import {
  deleteItem,
  deleteSuccess,
  insertItem,
  deleteError,
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
import { optimisticUpdateFactory } from './actionCreatorsFactories/optimisticUpdateFactory';
import { optimisticDeleteFactory } from './actionCreatorsFactories/optimisticDeleteFactory';

const getAxios = getAxiosFactory(axios, API_URL);

export const postItem = postItemFactory(
  {
    insertItem,
    generateId,
    postSuccess,
    postError,
    getAxios: getAxios()
  });

const putItem = putItemFactory(
  {
    putSuccess,
    putError,
    getAxios: getAxios()
  });

const deleteFromServer = deleteItemFactory(
  {
    deleteSuccess,
    deleteError,
    getAxios: getAxios()
  });

export const fetchItems = fetchItemsFactory(
  {
    insertItem,
    fetchSuccess,
    fetchError,
    getAxios: getAxios()
  });

export const optimisticUpdate = optimisticUpdateFactory(updateItem, putItem);
export const optimisticDelete = optimisticDeleteFactory(deleteItem, deleteFromServer);
