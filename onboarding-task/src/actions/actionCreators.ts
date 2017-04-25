import 'isomorphic-fetch';
import { TOGGLE_ITEM_VIEW_MODE, EDIT_ITEM, DELETE_ITEM, REQUEST_ITEMS, RECEIVE_ITEMS } from './actionTypes';
import { generateGuid } from '../utils/generateGuid';
import { createItemFactory } from './createItemFactory';
import { IAction } from './IAction';
import * as fetch from 'isomorphic-fetch';
import { Item } from '../models/Item';

const createItemWithDependencies = createItemFactory(generateGuid);

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

const requestItems = () => ({
  type: REQUEST_ITEMS,
});

const receiveItems = (json: any): IAction => ({
  type: RECEIVE_ITEMS,
  payload: {
    items: json.map((item: Item) => item as Item),
  },
});

const createReceivedItem = (item : Item) => ({
  type: RECEIVE_ITEMS,
  payload: {
    item,
  }
});

const fetchItems = () => {
  return (dispatch: any) => {
    dispatch(requestItems());
    return fetch('api/v1/Items/')
      .then((response: any) => response.json())
      .then((json: any) => dispatch(receiveItems(json)))
  }
};

export {
  createItemWithDependencies as createItem,
  deleteItem,
  editItem,
  toggleItemViewMode,
  requestItems,
  receiveItems,
  fetchItems,
  createReceivedItem
};
