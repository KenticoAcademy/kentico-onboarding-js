import {
  convertNote,
  convertNotes
} from '../../src/utils/noteConverter';
import { Note } from '../../src/models/Note';
import { mockServerNote } from '../testUtils/mocks';

describe('NoteConverter ', () => {
  it('should correctly convert server note to application note.', () => {
    const text = 'Test visibleText';
    const id = '1';
    const expectedApplicationNote = new Note({
      visibleText: text,
      serverSynchronizedText: text,
      id,
    });
    const serverNote = {
      text,
      id,
      lastModificationDate: new Date(2017, 12, 5),
      creationDate: new Date(2017, 12, 4),
    };

    const actualApplicationNote = convertNote(serverNote);

    expect(actualApplicationNote).toEqual(expectedApplicationNote);
  });

  it('should correctly convert array of server notes to array of application notes.', () => {
    const serverNotes = [mockServerNote('A', '1'), mockServerNote('B', '2')];
    const expectedApplicationNotes = [
      ['1', new Note({
        id: '1',
        serverSynchronizedText: 'A',
        visibleText: 'A'
      })],
      ['2', new Note({
        id: '2',
        serverSynchronizedText: 'B',
        visibleText: 'B'
      })]
    ];

    const actualApplicationNotes = convertNotes(serverNotes);

    expect(actualApplicationNotes).toEqual(expectedApplicationNotes);
  });
});
