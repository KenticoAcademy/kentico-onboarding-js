import { combineReducers } from 'redux';
import { items } from './items/items';
import { fetchItemsState } from './fetchItemsState/fetchItemsState';

export const list = combineReducers({
  items,
  fetchItemsState,
});
