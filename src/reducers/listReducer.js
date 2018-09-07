import { combineReducers } from 'redux';
import { itemsReducer as items } from './items';

export default combineReducers({
  items,
});
