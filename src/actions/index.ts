import axios, {
  AxiosResponse,
  AxiosStatic
} from 'axios';
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
import { generateId, Uuid } from '../utils/generateId';
import { deleteItemFactory } from './actionCreatorsFactories/deleteItemFactory';
import { putItemFactory } from './actionCreatorsFactories/putItemFactory';
import { fetchItemsFactory } from './actionCreatorsFactories/fetchItemsFactory';
import { postItemFactory } from './actionCreatorsFactories/postItemFactory';
import { API_URL } from '../constants/connection';

const fetchFactory = (axios: AxiosStatic, url: string) =>
  (): Promise<AxiosResponse> =>
    axios.get(url);

const postFactory = (axios: AxiosStatic, url: string) =>
  (data: { text: string }): Promise<AxiosResponse> =>
    axios.post(url, data);

const putFactory = (axios: AxiosStatic, url: string) =>
  (data: { id: Uuid, text: string }): Promise<AxiosResponse> =>
    axios.put(`${url}/${data.id}`, data);

const deleteFactory = (axios: AxiosStatic, url: string) =>
  (id: Uuid): Promise<AxiosResponse> =>
    axios.delete(`${url}/${id}`);

const axiosFetch = fetchFactory(axios, API_URL);
const axiosPost = postFactory(axios, API_URL);
const axiosPut = putFactory(axios, API_URL);
const axiosDelete = deleteFactory(axios, API_URL);

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
