import { OrderedMap } from 'immutable';
import { Note } from '../models/Note';

interface INoteToStore {
  readonly text: string;
  readonly noteId: Guid;
}

export const prepareNotesForStoring = (notes: OrderedMap<Guid, Note>): Iterable<INoteToStore> => (
  notes
    .valueSeq()
    .map(({ text, id: noteId }: Note) => ({
      text,
      noteId,
    }))
);

export const prepareNotesForApplication = (databaseNotes: OrderedMap<Guid, INoteToStore>): Iterable<Note> => (
  databaseNotes
    .map(({text, noteId: id }: INoteToStore) => ([
      id,
      new Note({
        id,
        text,
        isEditActive: false,
      }),
    ]))
);
