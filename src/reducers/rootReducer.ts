import { combineReducers } from 'redux';
import { todoList } from './todoList/todoList';

export const rootReducer = combineReducers({ todoList });
