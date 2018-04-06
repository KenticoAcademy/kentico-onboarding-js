import * as _fetch from 'isomorphic-fetch';

import { addItemFactory } from './factories/addItemFactory';
import { getItemsFactory } from './factories/getItemsFactory';
import { ItemsApiService } from '../services/itemsApiService';

export const addItem = addItemFactory(new ItemsApiService(_fetch));
export const getItems = getItemsFactory(new ItemsApiService(_fetch));
export * from './creators/listActions';
export * from './creators/itemActions';
