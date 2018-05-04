import { combineReducers } from 'redux';
import { INotesLoaderState } from '../../IStoreState';
import { isLoadingNotes } from './settings/isLoadingNotes';
import { errorId } from './settings/errorId';

export const loader = combineReducers<INotesLoaderState>({
  isLoadingNotes,
  errorId,
});
