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
  fetchError,
  postError,
  fetchSuccess
} from './actionCreators';
import { generateId } from '../utils/generateId';
import { deleteItemFactory } from './actionCreatorsFactories/deleteItemFactory';
import { putItemFactory } from './actionCreatorsFactories/putItemFactory';
import { fetchItemsFactory } from './actionCreatorsFactories/fetchItemsFactory';
import { postItemFactory } from './actionCreatorsFactories/postItemFactory';

import {
  axiosDeleteFactory,
  axiosFetchFactory,
  axiosPostFactory,
  axiosPutFactory
} from '../axiosFactories/axiosFactories';

const axiosFetch = axiosFetchFactory(axios, process.env.API_URL);
const axiosPost = axiosPostFactory(axios, process.env.API_URL);
const axiosPut = axiosPutFactory(axios, process.env.API_URL);
const axiosDelete = axiosDeleteFactory(axios, process.env.API_URL);

export const fetchItems = fetchItemsFactory(
  {
    insertItem,
    fetchSuccess,
    fetchError,
    axiosFetch
  });

export const postItem = postItemFactory(
  {
    insertItem,
    generateId,
    postSuccess,
    postError,
    axiosPost
  });

export const putItem = putItemFactory(
  {
    updateItem,
    putSuccess,
    putError,
    axiosPut
  });

export const deleteFromServer = deleteItemFactory(
  {
    deleteItem,
    deleteSuccess,
    deleteError,
    axiosDelete
  });
