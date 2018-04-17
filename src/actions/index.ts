import * as _fetch from 'isomorphic-fetch';

import { addItemFactory } from './factories/addItemFactory';
import { getItemsFactory } from './factories/getItemsFactory';
import { itemsApiService } from '../services/itemsApiService';
import { saveItemFactory } from './factories/saveItemFactory';
import { deleteItemFactory } from './factories/deleteItemFactory';
import { saveSelectedItemsFactory } from './factories/saveSelectedItemsFactory';
import { deleteSelectedItemsFactory } from './factories/deleteSelectedItemsFactory';
import { getIdentifier } from '../utils/getIdentifier';
import { saveLocalItemFactory } from './factories/saveLocalItemFactory';
import { deleteItemOptimistic } from './creators/listActions';

const apiService = itemsApiService(_fetch);

export const getItems = getItemsFactory(apiService.getItems);
export const addItem = addItemFactory(apiService.postItem, getIdentifier);
export const saveItem = saveItemFactory(apiService.putItem);
export const saveLocalItem = saveLocalItemFactory(apiService.postItem);
export const deleteItem = deleteItemFactory(apiService.deleteItem);
export const deleteLocalItem = deleteItemOptimistic;
export const saveItems = saveSelectedItemsFactory(apiService.putItem);
export const deleteItems = deleteSelectedItemsFactory(apiService.deleteItem);
export * from './creators/listActions';
export * from './creators/itemActions';
