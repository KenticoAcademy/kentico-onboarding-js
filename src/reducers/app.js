import { combineReducers } from 'redux';
import { todoList } from './todo-list/todoList';

export const app = combineReducers({
  todoList,
});
