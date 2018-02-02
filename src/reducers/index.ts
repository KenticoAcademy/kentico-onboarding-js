import { combineReducers } from 'redux';
import { list } from './list/list';
import { registeredAction } from './registeredAction/registeredAction';

export const reducers = combineReducers({
  list,
  registeredAction,
});
