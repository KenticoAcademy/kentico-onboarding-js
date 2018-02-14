import { list } from './list/list';
import { IAppState } from '../models/interfaces/IAppState';
import { combineReducers } from '../utils/combineReducers';

export const reducers = combineReducers<IAppState>({
  list,
});
