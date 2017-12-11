import { combineReducers } from 'redux';
import { notes } from './notes/notes';
import { IStoreState } from '../models/IStoreState';

export const application = combineReducers<IStoreState>({
  notes,
});
