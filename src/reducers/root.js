import { combineReducers } from 'redux';
import { newItemText } from './items/newItemText';
import { itemsById } from './items/itemsById';

export const root = combineReducers({
  itemsById,
  newItemText,
});
