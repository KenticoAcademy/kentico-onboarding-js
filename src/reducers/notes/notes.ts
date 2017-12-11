import { combineReducers } from 'redux';
import { isAddingNote } from './list/isAddingNote';
import { listOfNotes } from './list/listOfNotes';
import { addNoteText } from './list/addingNoteText';
import { INotesState } from '../../models/IStoreState';

export const notes = combineReducers<INotesState>({
  isAddingNote,
  listOfNotes,
  addNoteText,
});
