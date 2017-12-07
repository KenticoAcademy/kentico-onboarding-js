import { combineReducers } from 'redux';
import { todoList } from './todo-list/todoList';
import { IAppState } from '../models/IAppState';

export const app = combineReducers<IAppState>({
  todoList,
});
