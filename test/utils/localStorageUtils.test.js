import {
  prepareNotesForStoring,
  prepareNotesForApplication,
} from '../../src/utils/localStorageUtils.ts';
import {
  mockNotesForStoring,
  mockNotesForApplication,
  prepareNotesInitialState,
} from '../testUtils/prepareTestData';

describe('localStorageUtils tests', () => {
  it('prepareNotesForStoring', () => {
    const expectedNotes = mockNotesForStoring();
    const notesForStoring = prepareNotesInitialState();

    const preparedNotes = prepareNotesForStoring(notesForStoring);
    const actualNotes = JSON.stringify(preparedNotes);

    expect(actualNotes).toEqual(expectedNotes);
  });

  it('prepareNotesForApplication tests', () => {
    const expectedNotes = mockNotesForApplication();
    const notesFromStorage = mockNotesForStoring();
    const parsedStorageNotes = JSON.parse(notesFromStorage);

    const actualNotes = prepareNotesForApplication(parsedStorageNotes);

    expect(actualNotes).toEqual(expectedNotes);
  });
});
