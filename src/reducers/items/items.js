import { combineReducers } from 'redux';
import { newItemText } from './newItemText.ts';
import { byId } from './byId';

export const items = combineReducers({
  byId,
  newItemText,
});
