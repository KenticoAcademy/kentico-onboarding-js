import { combineReducers } from 'redux';
import { todoList } from './todo-list/todoList';
import { IAppState } from '../models/IAppState';
import { fetchStatus } from './fetchStatus';

export const app = combineReducers<IAppState>({
  todoList,
  fetchStatus
});
