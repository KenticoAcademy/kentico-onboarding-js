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
import { API_URL } from '../constants/connection';

const url = process.env.API_URL || API_URL;

const axiosFetch = axiosFetchFactory(axios, url);
const axiosPost = axiosPostFactory(axios, url);
const axiosPut = axiosPutFactory(axios, url);
const axiosDelete = axiosDeleteFactory(axios, url);

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
