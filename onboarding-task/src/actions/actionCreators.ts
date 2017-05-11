import 'isomorphic-fetch';
import {
  TOGGLE_ITEM_VIEW_MODE,
  EDIT_ITEM,
  DELETE_ITEM,
  ITEMS_FETCHING_SUCCESS,
  POSITIVELY_CREATE_ITEM_LOCALLY,
  ITEM_POST_SUCCESS,
  ITEMS_FETCHING_STARTED,
} from './actionTypes';
import { generateGuid } from '../utils/generateGuid';
import { fetchItemsFactory } from './fetchItemsFactory';
import { IAction } from './IAction';
import * as fetch from 'isomorphic-fetch';
import { Item } from '../models/Item';
import { postItemFactory } from './postItemFactory';
import { receiveItemsFetchingErrorFactory } from './receiveItemsFetchingErrorFactory';
import { receivePostItemErrorFactory } from './receivePostItemErrorFactory';

const fetchItemsWithDependencies = fetchItemsFactory(fetch);
const postItemWithDependencies = postItemFactory(fetch)(generateGuid);
const receiveItemsFetchingErrorWithDependencies = receiveItemsFetchingErrorFactory(generateGuid);
const receivePostItemErrorWithDependencies = receivePostItemErrorFactory(generateGuid);

const deleteItem = (id: string): IAction => ({
  type: DELETE_ITEM,
  payload: { id },
});

const editItem = (id: string, value: string): IAction => ({
  type: EDIT_ITEM,
  payload: { id, value },
});

const toggleItemViewMode = (id: string): IAction => ({
  type: TOGGLE_ITEM_VIEW_MODE,
  payload: { id },
});

const createReceivedItem = (item: Item) => ({
  type: ITEMS_FETCHING_SUCCESS,
  payload: { item },
});

const positivelyCreateItemLocally = (item: Item) => ({
  type: POSITIVELY_CREATE_ITEM_LOCALLY,
  payload: {
    ueid: item.ueid,
    value: item.value,
  }
});

const receiveItemCreated = (json: Item): IAction => ({
  type: ITEM_POST_SUCCESS,
  payload: {
    item: json as Item,
  }
});

const requestItems = () => ({
  type: ITEMS_FETCHING_STARTED,
  payload: {},
});

const receiveItems = (json: any): IAction => ({
  type: ITEMS_FETCHING_SUCCESS,
  payload: {
    items: json.map((item: Item) => item as Item),
  },
});

export {
  deleteItem,
  editItem,
  toggleItemViewMode,
  createReceivedItem,
  fetchItemsWithDependencies as fetchItems,
  postItemWithDependencies as postItem,
  receiveItemsFetchingErrorWithDependencies as receiveItemsFetchingError,
  receivePostItemErrorWithDependencies as receivePostItemError,
  positivelyCreateItemLocally,
  receiveItemCreated,
  receiveItems,
  requestItems,
};
