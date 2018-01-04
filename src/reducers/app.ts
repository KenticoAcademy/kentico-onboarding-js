import { combineReducers } from 'redux';
import { todoList } from './todo-list/todoList';
import { IAppState } from '../models/IAppState';
import { isFetching } from './isFetching';

export const app = combineReducers<IAppState>({
  todoList,
  isFetching,
});
