import { combineReducers } from 'redux';
import { itemsReducer as items } from './itemsReducer';

export default combineReducers({
  items,
});
