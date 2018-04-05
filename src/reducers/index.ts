import { list } from './list/index';
import { IAppState } from '../models/state/IAppState';
import { combineReducers } from '../utils/combineReducers';

export const reducers = combineReducers<IAppState>({
  list,
});
