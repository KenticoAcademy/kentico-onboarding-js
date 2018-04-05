import { list } from './list';
import { IAppState } from '../models/state/IAppState';
import { combineReducers } from '../utils/combineReducers';

export const reducers = combineReducers<IAppState>({
  list,
});
