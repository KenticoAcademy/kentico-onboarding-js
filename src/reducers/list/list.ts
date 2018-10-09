import { combineReducers } from 'redux';
import { items } from './items';
import { isLoading } from './isLoading';
import { error } from './error';
import { itemErrors } from './itemErrors';

export const list = combineReducers({ items, itemErrors, isLoading, error });
