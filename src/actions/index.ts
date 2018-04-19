import axios, { AxiosResponse } from 'axios';
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
import {
  API_URL,
  NO_CONNECTION,
  SERVER_CONNECTION_PROBLEM
} from '../constants/connection';
import { retryFactory } from './actionCreatorsFactories/retry';

const url = process.env.API_URL || API_URL;

const axiosFetch = axiosFetchFactory(axios, url);
const axiosPost = axiosPostFactory(axios, url);
const axiosPut = axiosPutFactory(axios, url);
const axiosDelete = axiosDeleteFactory(axios, url);

const getErrorMessage = (errorResponse: AxiosResponse) =>
  errorResponse === undefined
    ? NO_CONNECTION
    : SERVER_CONNECTION_PROBLEM;

export const fetchItems = fetchItemsFactory({
  axiosFetch,
  getErrorMessage,
});

export const postItem = postItemFactory({
  generateId,
  axiosPost,
  getErrorMessage
});

export const putItem = putItemFactory({
  axiosPut,
  getErrorMessage
});

export const deleteFromServer = deleteItemFactory({
  axiosDelete,
  getErrorMessage
});

export const retry = retryFactory({
  postItem,
  putItem,
  deleteFromServer
});
