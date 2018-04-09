import * as _fetch from 'isomorphic-fetch';

import { addItemFactory } from './factories/addItemFactory';
import { getItemsFactory } from './factories/getItemsFactory';
import { itemsApiService } from '../services/itemsApiService';
import { saveItemFactory } from './factories/saveItemFactory';
import { deleteItemFactory } from './factories/deleteItemFactory';
import { saveSelectedItemsFactory } from './factories/saveSelectedItemsFactory';
import { deleteSelectedItemsFactory } from './factories/deleteSelectedItemsFactory';

const apiService = itemsApiService(_fetch);

export const getItems = getItemsFactory(apiService.getItems);
export const addItem = addItemFactory(apiService.postItem);
export const saveItem = saveItemFactory(apiService.postItem);
export const deleteItem = deleteItemFactory(apiService.deleteItem);
export const saveItems = saveSelectedItemsFactory(apiService.postItem);
export const deleteItems = deleteSelectedItemsFactory(apiService.deleteItem);
export * from './creators/listActions';
export * from './creators/itemActions';
