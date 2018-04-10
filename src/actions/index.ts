import axios from 'axios';
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

export const fetchItems = fetchItemsFactory({
  axiosFetch
});

export const postItem = postItemFactory({
  generateId,
  axiosPost
});

export const putItem = putItemFactory({
  generateId,
  axiosPut
});

export const deleteFromServer = deleteItemFactory({
  generateId,
  axiosDelete
});
