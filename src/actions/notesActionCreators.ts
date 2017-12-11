import {
  ADD_NOTE,
  CANCEL_EDITING_NOTE,
  DELETE_NOTE,
  START_EDITING_NOTE,
  UPDATE_NOTE,
} from '../constants/actionTypes';
import { IAction } from '../models/IAction';

export const addNewNoteFactory = (generateIdFunction: () => Guid) => (noteText: string): IAction => ({
  type: ADD_NOTE,
  payload: {
    text: noteText,
    noteId: generateIdFunction(),
  },
});

export const updateNote = (textChanges: string, noteId: Guid): IAction => ({
  type: UPDATE_NOTE,
  payload: {
    text: textChanges,
    noteId,
  },
});

export const deleteNote = (noteId: Guid): IAction => ({
  type: DELETE_NOTE,
  payload: {
    noteId,
  },
});

export const startEditingNote = (noteId: Guid): IAction => ({
  type: START_EDITING_NOTE,
  payload: {
    noteId,
  },
});

export const cancelEditingNote = (noteId: Guid): IAction => ({
  type: CANCEL_EDITING_NOTE,
  payload: {
    noteId,
  },
});
