import { IAction } from '../../../../actions/IAction';
import { Note } from '../../../../models/Note';
import {
  CANCEL_EDITING_NOTE,
  CANCEL_FAILED_DELETE_ACTION,
  CANCEL_FAILED_UPDATE_ACTION,
  DELETING_NOTE_FROM_SERVER_FAILURE,
  SENDING_NOTE_TO_SERVER_FAILURE,
  SENDING_NOTE_TO_SERVER_SUCCESS,
  START_DELETING_NOTE_FROM_SERVER,
  START_EDITING_NOTE,
  START_RESENDING_NOTE_TO_SERVER,
  START_SENDING_NOTE_TO_SERVER,
  START_UPDATING_NOTE_ON_SERVER,
  UPDATING_NOTE_ON_SERVER_FAILURE,
  UPDATING_NOTE_ON_SERVER_SUCCESS
} from '../../../../constants/actionTypes';
import { NoteState } from '../../../../enums/NoteState';

const updateNote = (stateNote: Note, updatedNote: Partial<Note>): Note =>
  stateNote.with(updatedNote);

const updateNoteOnFailure = (state: Note, payload: { noteId: Guid, errorId: Guid }) =>
  updateNote(
    state,
    {
      noteState: NoteState.INACTIVE_ERROR,
      errorId: payload.errorId,
    }
  );

export const note = (state = new Note(), action: IAction): Note => {
  switch (action.type) {
    case START_SENDING_NOTE_TO_SERVER:
      return new Note({
        id: action.payload.noteId,
        visibleText: action.payload.text,
        noteState: NoteState.COMMUNICATING,
      });

    case START_RESENDING_NOTE_TO_SERVER:
      return updateNote(
        state,
        { noteState: NoteState.COMMUNICATING },
      );

    case SENDING_NOTE_TO_SERVER_SUCCESS:
      return new Note({
        id: action.payload.noteId,
        visibleText: action.payload.text,
        serverSynchronizedText: action.payload.text,
      });

    case UPDATING_NOTE_ON_SERVER_SUCCESS:
      return updateNote(
        state,
        {
          serverSynchronizedText: action.payload.text,
          visibleText: action.payload.text,
          errorId: undefined,
          noteState: NoteState.ACTIVE,
        }
      );

    case START_EDITING_NOTE:
      return updateNote(state, { noteState: NoteState.EDITOR });

    case CANCEL_EDITING_NOTE:
      return updateNote(state, { noteState: NoteState.ACTIVE, errorId: undefined });

    case START_UPDATING_NOTE_ON_SERVER:
      return updateNote(
        state,
        {
          noteState: NoteState.COMMUNICATING,
          visibleText: action.payload.newText
        }
      );

    case START_DELETING_NOTE_FROM_SERVER:
      return updateNote(state, { noteState: NoteState.COMMUNICATING });

    case DELETING_NOTE_FROM_SERVER_FAILURE:
    case SENDING_NOTE_TO_SERVER_FAILURE:
    case UPDATING_NOTE_ON_SERVER_FAILURE:
      return updateNoteOnFailure(state, action.payload);

    case CANCEL_FAILED_DELETE_ACTION:
      return updateNote(
        state,
        {
          noteState: NoteState.ACTIVE,
          errorId: undefined,
        }
      );

    case CANCEL_FAILED_UPDATE_ACTION:
      return updateNote(
        state,
        {
          noteState: NoteState.ACTIVE,
          errorId: undefined,
          visibleText: action.payload.serverSynchronizedText
        }
      );

    default:
      return state;
  }
};
