import { combineReducers } from 'redux';
import { todoListReducer } from './todoList/todoListReducer';

export const rootReducer = combineReducers({ todoListReducer });
