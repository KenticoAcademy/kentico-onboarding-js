import { combineReducers } from 'redux';
import { items } from './items/items';

export const list = combineReducers({
  items,
});
