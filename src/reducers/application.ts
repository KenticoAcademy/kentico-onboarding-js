import { combineReducers } from 'redux';
import { notes } from './notes/notes';
import { IStoreState } from './IStoreState';
import { errors } from './errors/errors';

export const application = combineReducers<IStoreState>({
  notes,
  errors,
});
