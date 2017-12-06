import { combineReducers } from 'redux';
import { itemsReducer } from './items';

export const listReducer = combineReducers({
  items: itemsReducer,
});
