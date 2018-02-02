import { combineReducers } from 'redux';
import { items } from './items/items';
import { fetchItemsState } from './fetchItemsState/fetchItemsState';
import { message } from './message/message';

export const list = combineReducers({
  items,
  fetchItemsState,
  message,
});
