import { combineReducers } from 'redux';
import { todoList } from './todo-list/todoList';
import { IAppState } from '../models/IAppState';
import { fetchStatus } from './fetchStatus';
import { postStatus } from './postStatus';
import { putStatus } from './putStatus';
import { deleteStatus } from './deleteStatus';

export const app = combineReducers<IAppState>({
  todoList,
  fetchStatus,
  postStatus,
  putStatus,
  deleteStatus
});
