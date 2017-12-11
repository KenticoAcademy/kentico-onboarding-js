import { generateId } from '../utils/generateId';
import { addNewNoteFactory } from './notesActionCreators';

export const addNewNote = addNewNoteFactory(generateId);
export * from './addNoteActionCreators';
export * from './notesActionCreators';
