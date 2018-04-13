import { combineReducers } from 'redux';
import { todoList } from './todo-list/todoList';
import { IAppState } from '../models/IAppState';
import { fetchStatus } from './todo-list/fetchStatus';
import { error } from './todo-list/error';

export const app = combineReducers<IAppState>({
  todoList,
  error,
  fetchStatus,
});
