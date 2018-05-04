import { OrderedMap } from 'immutable';
import { Note } from '../../../models/Note';
import {
  CANCEL_EDITING_NOTE,
  CANCEL_FAILED_ADD_ACTION,
  CANCEL_FAILED_DELETE_ACTION,
  CANCEL_FAILED_UPDATE_ACTION,
  DELETING_NOTE_FROM_SERVER_FAILURE,
  DELETING_NOTE_FROM_SERVER_SUCCESS,
  LOADING_NOTES_SUCCESS,
  SENDING_NOTE_TO_SERVER_FAILURE,
  SENDING_NOTE_TO_SERVER_SUCCESS,
  START_DELETING_NOTE_FROM_SERVER,
  START_EDITING_NOTE,
  START_RESENDING_NOTE_TO_SERVER,
  START_SENDING_NOTE_TO_SERVER,
  START_UPDATING_NOTE_ON_SERVER,
  UPDATING_NOTE_ON_SERVER_FAILURE,
  UPDATING_NOTE_ON_SERVER_SUCCESS,
} from '../../../constants/actionTypes';
import { IAction } from '../../../actions/IAction';
import { note } from './note/note';

const updateNote = (state: OrderedMap<Guid, Note>, action: IAction): OrderedMap<Guid, Note> => {
  const updatedNote = note(state.get(action.payload.noteId), action);

  return state.update(action.payload.noteId, note => note.with(updatedNote));
};

export const listOfNotes = (state = OrderedMap<Guid, Note>(), action: IAction): OrderedMap<Guid, Note> => {
  switch (action.type) {
    case LOADING_NOTES_SUCCESS:
      return OrderedMap(action.payload.notes);

    case START_SENDING_NOTE_TO_SERVER: {
      const noteToAdd = note(undefined, action);

      return state.set(action.payload.noteId, noteToAdd);
    }

    case START_RESENDING_NOTE_TO_SERVER: {
      const updatedNote = note(state.get(action.payload.localNoteId), action);

      return state.update(action.payload.localNoteId, note => note.with(updatedNote));
    }

    case SENDING_NOTE_TO_SERVER_SUCCESS: {
      const deletedNoteState = state.delete(action.payload.localNoteId);
      const noteToAdd = note(undefined, action);

      return deletedNoteState
        .set(action.payload.noteId, noteToAdd);
    }

    case UPDATING_NOTE_ON_SERVER_SUCCESS:
    case START_EDITING_NOTE:
    case CANCEL_EDITING_NOTE:
    case START_UPDATING_NOTE_ON_SERVER:
    case START_DELETING_NOTE_FROM_SERVER:
    case DELETING_NOTE_FROM_SERVER_FAILURE:
    case SENDING_NOTE_TO_SERVER_FAILURE:
    case UPDATING_NOTE_ON_SERVER_FAILURE:
    case CANCEL_FAILED_DELETE_ACTION:
    case CANCEL_FAILED_UPDATE_ACTION:
      return updateNote(state, action);

    case DELETING_NOTE_FROM_SERVER_SUCCESS:
    case CANCEL_FAILED_ADD_ACTION :
      return state.delete(action.payload.noteId);

    default:
      return state;
  }
};
