import { combineReducers } from 'redux';
import { listReducer } from './list';

export const reducers = combineReducers({
  list: listReducer,
});
