import { combineReducers } from 'redux';
import { list } from './list/list';

export const app = combineReducers({
  list,
});
