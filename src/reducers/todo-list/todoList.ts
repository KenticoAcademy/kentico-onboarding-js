import { combineReducers } from 'redux';
import { items } from './items/items';
import { ITodoList } from '../../models/IAppState';

export const todoList = combineReducers<ITodoList>({
  items,
});
