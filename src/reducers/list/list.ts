import { combineReducers } from 'redux';
import { items } from './items/items';
import { sorting } from './sorting';
import { IListState } from '../interfaces/IListState';
import { newItem } from './newItem/newItem';
import { listStatus } from './listStatus';
import { itemsErrors } from './itemsErrors/itemsErrors';

export const list = combineReducers<IListState>({ items, sorting, newItem, listStatus, itemsErrors });
