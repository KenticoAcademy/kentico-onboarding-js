import * as _fetch from 'isomorphic-fetch';

import { addItemFactory } from './factories/addItemFactory';
import { getItemsFactory } from './factories/getItemsFactory';
import { ItemsApiService } from '../services/itemsApiService';
import { saveItemFactory } from './factories/saveItemFactory';

const itemsApiService = new ItemsApiService(_fetch);

export const getItems = getItemsFactory(itemsApiService);
export const addItem = addItemFactory(itemsApiService);
export const saveItem = saveItemFactory(itemsApiService);
export * from './creators/listActions';
export * from './creators/itemActions';
