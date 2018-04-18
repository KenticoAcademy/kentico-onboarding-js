import { combineReducers } from 'redux';
import { todoList } from './todo-list/todoList';
import { IAppState } from '../models/IAppState';
import { error } from './todo-list/error';
import { listPageState } from './listPageState';

export const app = combineReducers<IAppState>({
  todoList,
  error,
  listPageState,
});
