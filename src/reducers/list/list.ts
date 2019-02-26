import { combineReducers } from 'redux';
import { items } from './items/items';
import { sorting } from './sorting';
import { IListState } from '../interfaces/IListState';
import { listStatus } from './listStatus';

export const list = combineReducers<IListState>({items, sorting, listStatus });
