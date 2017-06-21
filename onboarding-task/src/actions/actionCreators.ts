import 'isomorphic-fetch';

import {
  TOGGLE_ITEM_VIEW_MODE,
  EDIT_ITEM,
  DELETE_ITEM,
  ITEMS_FETCHING_SUCCEED,
  POSITIVELY_CREATE_ITEM_LOCALLY,
  ITEM_SAVE_SUCCEED,
  ITEMS_FETCHING_STARTED,
  DELETE_ERROR,
} from './actionTypes';
import { generateGuid } from '../utils/generateGuid';
import { fetchItemsFactory } from './fetchItemsFactory';
import { IAction } from './IAction';
import * as fetch from 'isomorphic-fetch';
import { Item } from '../models/Item';
import { postItemFactory } from './postItemFactory';
import { receiveItemsFetchingErrorFactory } from './receiveItemsFetchingErrorFactory';
import { receivePostItemErrorFactory } from './receivePostItemErrorFactory';
import { parseResponse } from '../utils/parseResponse';

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

const positivelyCreateItemLocally = (item: Item): IAction => ({
  type: POSITIVELY_CREATE_ITEM_LOCALLY,
  payload: {
    ueid: item.ueid,
    value: item.value,
  }
});

const receiveItemCreated = (json: Item): IAction => ({
  type: ITEM_SAVE_SUCCEED,
  payload: {
    item: json as Item,
  }
});

const requestItems = (): IAction => ({
  type: ITEMS_FETCHING_STARTED,
  payload: {},
});

const receiveItems = (json: any): IAction => ({
  type: ITEMS_FETCHING_SUCCEED,
  payload: {
    items: json.map((item: Item) => item as Item),
  },
});

const deleteError = (id: string): IAction => ({
  type: DELETE_ERROR,
  payload: { id },
});

const catchedFetch = (input: Request | string, init?: RequestInit): Promise<Response> => fetch(input, init)
  .catch(() => Promise.reject(new Error('A good chance we are offline.')));

const receiveItemsFetchingErrorWithDependencies = receiveItemsFetchingErrorFactory(generateGuid);
const receivePostItemErrorWithDependencies = receivePostItemErrorFactory(generateGuid);
const fetchItemsWithDependencies = fetchItemsFactory({
  requestItems,
  fetch: catchedFetch,
  parseResponse,
  receiveItems,
  receiveItemsFetchingError: receiveItemsFetchingErrorWithDependencies,
});
const postItemWithDependencies = postItemFactory({
  positivelyCreateItemLocally,
  fetch: catchedFetch,
  generateId: generateGuid,
  receivePostItemError: receivePostItemErrorWithDependencies,
  receiveItemCreated,
  parseResponse,
});

export {
  deleteItem,
  editItem,
  toggleItemViewMode,
  fetchItemsWithDependencies as fetchItems,
  postItemWithDependencies as postItem,
  positivelyCreateItemLocally,
  requestItems,
  deleteError,
};
