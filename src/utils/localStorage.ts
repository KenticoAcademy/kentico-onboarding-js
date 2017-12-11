import {
  prepareNotesForStoring,
  prepareNotesForApplication,
} from './localStorageUtils';
import { OrderedMap } from 'immutable';
import { Note } from '../models/Note';

export const saveNotesDataFactory = (saveFunction: (key: string, data: string) => void) =>
  (key: string, dataToStore: OrderedMap<Guid, Note>): void => {

    try {
      const serializedNotes = JSON.stringify(prepareNotesForStoring(dataToStore));
      saveFunction(key, serializedNotes);
    } catch (error) {
      throw new Error('Error while saving data to storage!');
    }
  };

export const getSavedNotesFactory = (loadFunction: (key: string) => string | null) => (key: string): Iterable<Note> | {} => {
  let serializedNotes;

  try {
    serializedNotes = loadFunction(key);
  } catch (error) {
    throw new Error('Error while retrieving data from storage!');
  }

  return serializedNotes ? prepareNotesForApplication(JSON.parse(serializedNotes)) : {};
};

export const getSavedNotes = getSavedNotesFactory((key: string) => localStorage.getItem(key));
export const saveNotesData = saveNotesDataFactory((key: string, dataToStore: string) => localStorage.setItem(key, dataToStore));
