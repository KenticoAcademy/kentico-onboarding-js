import { combineReducers } from 'redux';
import { items } from './items/items';
import { IAppState } from '../../models/IAppState';

export const todoList = combineReducers<IAppState['todoList']>({
  items,
});
