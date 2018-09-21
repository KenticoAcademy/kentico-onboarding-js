import { combineReducers } from 'redux';
import { items } from './items';
import { isLoading } from './isLoading';
import { error } from './error';

export const list = combineReducers({ items, isLoading, error });
