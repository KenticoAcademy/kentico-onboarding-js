import { combineReducers as _combineReducers } from 'redux';
import { ReducersMapObject } from '../models/ReducersMapObject';

export const combineReducers = <TState>(reducers: ReducersMapObject<TState>) =>
  _combineReducers<TState>(reducers);
