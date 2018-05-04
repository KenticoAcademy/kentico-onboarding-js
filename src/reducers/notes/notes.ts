import { combineReducers } from 'redux';
import { isAddingNote } from './list/isAddingNote';
import { listOfNotes } from './list/listOfNotes';
import { addNoteText } from './list/addingNoteText';
import { INotesState } from '../IStoreState';
import { loader } from './loader/loader';

export const notes = combineReducers<INotesState>({
  isAddingNote,
  listOfNotes,
  addNoteText,
  loader,
});
