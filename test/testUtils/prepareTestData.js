import { OrderedMap } from 'immutable';
import { Note } from '../../src/models/Note.ts';

export const prepareListItem = (text, id, isEditActive) =>
  new Note({
    text,
    id,
    isEditActive,
  });

export const prepareNotesInitialState = () =>
  OrderedMap(
    [
      [1, prepareListItem('First test note', 1, false)],
      [2, prepareListItem('Second test note', 2, false)],
    ],
  );

export const mockNotesForStoring = () =>
  JSON.stringify([
    {
      text: 'First test note',
      noteId: 1,
    },
    {
      text: 'Second test note',
      noteId: 2,
    },
  ]);

export const mockNotesForApplication = () =>
  [
    [
      1,
      new Note({
        text: 'First test note',
        id: 1,
        isEditActive: false,
      }),
    ],
    [
      2,
      new Note({
        text: 'Second test note',
        id: 2,
        isEditActive: false,
      }),
    ],
  ];
