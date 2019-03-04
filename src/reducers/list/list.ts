import { combineReducers } from 'redux';
import { items } from './items/items';
import { sorting } from './sorting';
import { IListState } from '../interfaces/IListState';

export const list = combineReducers<IListState>({items, sorting });
