import {
  getSavedNotesFactory,
  saveNotesDataFactory,
} from '../../src/utils/localStorage.ts';
import {
  mockNotesForApplication,
  mockNotesForStoring,
  prepareNotesInitialState,
} from '../testUtils/prepareTestData';
import { OrderedMap } from 'immutable';

describe('Test local storage functionality', () => {
  it('saveNotesDataFactory test', () => {
    const key = 'testKey';
    const notes = prepareNotesInitialState();
    const savedData = {
      key: '',
      notes: OrderedMap(),
    };
    const saveData = (saveKey, saveNotes) => {
      savedData.key = saveKey;
      savedData.notes = saveNotes;
    };

    saveNotesDataFactory((saveKey, saveNotes) => saveData(saveKey, saveNotes))(key, notes);

    expect(savedData.key).toEqual(key);
    expect(savedData.notes).toEqual(mockNotesForStoring());
  });

  it('getSaveNotesFactory test', () => {
    const testStoringNotes = mockNotesForStoring();
    const getData = () => testStoringNotes;

    const loadedNotes = getSavedNotesFactory((key) => getData(key))('testKey');

    expect(loadedNotes).toEqual(mockNotesForApplication());
  });
});
