import { combineReducers } from 'redux';
import { items } from './items';

export const listReducer = combineReducers({
  items,
});
