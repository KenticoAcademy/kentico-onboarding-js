import { combineReducers } from 'redux';
import { items } from './items/items';
import { ITodoListState } from '../../models/IAppState';

export const todoList = combineReducers<ITodoListState>({
  items,
});
