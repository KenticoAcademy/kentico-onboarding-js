import { combineReducers } from 'redux';
import { items } from './todoList/items';
import { isFetchingAll } from './todoList/isFetchingAll';
import { hasError } from './todoList/hasError';
import { failedActions } from './errors/failedActions';

export const reducers = combineReducers({
  items,
  isFetchingAll,
  hasError,
  failedActions,
});
