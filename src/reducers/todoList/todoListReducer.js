import { combineReducers } from 'redux';
import { items } from './items/items';

export const todoListReducer = combineReducers({ items });
