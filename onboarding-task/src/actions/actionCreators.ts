import 'isomorphic-fetch';
import {
  TOGGLE_ITEM_VIEW_MODE,
  EDIT_ITEM,
  DELETE_ITEM,
  ITEMS_FETCHING_SUCCESS,
  ITEM_POST_FAILED,
} from './actionTypes';
import { generateGuid } from '../utils/generateGuid';
import { fetchItemsFactory } from './fetchItemsFactory';
import { IAction } from './IAction';
import * as fetch from 'isomorphic-fetch';
import { Item } from '../models/Item';
import { postItemFactory } from './postItemFactory';
import { receiveItemsFetchingErrorFactory } from './receiveItemsFetchingErrorFactory';

const fetchItemsWithDependencies = fetchItemsFactory(fetch);
const postItemWithDependencies = postItemFactory(fetch)(generateGuid);
const receiveItemsFetchingErrorWithDependencies = receiveItemsFetchingErrorFactory(generateGuid);

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

const receivePostItemErrorFactory = (generateId: () => string) => (error: Error, itemUeid: string): IAction => ({
  type: ITEM_POST_FAILED,
  payload: {
    id: generateId(),
    itemUeid,
    message: error.message,
  },
});

const receivePostItemError = receivePostItemErrorFactory(generateGuid);

export {
  deleteItem,
  editItem,
  toggleItemViewMode,
  createReceivedItem,
  fetchItemsWithDependencies as fetchItems,
  postItemWithDependencies as postItem,
  receiveItemsFetchingErrorWithDependencies as receiveItemsFetchingError,
  receivePostItemError,
};
