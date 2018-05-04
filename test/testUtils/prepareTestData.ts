import { OrderedMap } from 'immutable';
import { Note } from '../../src/models/Note';
import { NoteState } from '../../src/enums/NoteState';

export const prepareNote = (text: string, id: Guid, noteState?: NoteState): Note =>
  new Note({
    visibleText: text,
    id,
    noteState: noteState === undefined
      ? NoteState.ACTIVE
      : noteState,
  });

export const prepareLocalNote = (text: string, id: Guid, noteState: NoteState): Note =>
  new Note({
    visibleText: text,
    id,
    noteState
  });

export const prepareNoteWithCommunicationError = (text: string, id: Guid, errorId: Guid): Note =>
  new Note({
    visibleText: text,
    id,
    errorId,
    noteState: NoteState.INACTIVE_ERROR
  });

export const prepareNotesInitialState = (): OrderedMap<Guid, Note> =>
  OrderedMap(
    [
      ['1', prepareNote('First test note', '1')],
      ['2', prepareNote('Second test note', '2')],
    ],
  );
