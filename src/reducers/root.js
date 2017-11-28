import { combineReducers } from 'redux';
import { items } from './items/items';
import { newItemText } from './items/newItemText';

export const root = combineReducers({
  items,
  newItemText,
});
