import {
  createStore,
  applyMiddleware,
} from 'redux';
import { logger } from 'redux-logger';
import { OrderedMap } from 'immutable';
import { application } from '../reducers/application';
import { Note } from '../models/Note';
import { IStoreState } from '../models/IStoreState';
import { Store } from 'react-redux';
import {
  Cancelable,
  throttle
} from 'lodash';

const LOCAL_STORAGE_NOTES_KEY = 'notes';
const THROTTLE_TIMEOUT = 1000;

const prepareInitialState = (getSavedNotes: (key: string) => Iterable<Note> | {}): IStoreState => {
  const persistedNotes = getSavedNotes(LOCAL_STORAGE_NOTES_KEY);

  return {
    notes: {
      listOfNotes: OrderedMap(persistedNotes),
      isAddingNote: false,
      addNoteText: '',
    },
  };
};

const saveData = (saveNotesData: (key: string, data: OrderedMap<Guid, Note>) => void, store: Store<IStoreState>): (() => void) & Cancelable =>
  throttle(
    () => {
      const stateNotes = store
        .getState()
        .notes
        .listOfNotes;

      saveNotesData(LOCAL_STORAGE_NOTES_KEY, stateNotes);
    },
    THROTTLE_TIMEOUT);

export const createApplicationStore = (getSavedNotes: (key: string) => Iterable<Note> | {},
  saveNotesData: (key: string, data: OrderedMap<Guid, Note>) => void): Store<IStoreState> => {

  const store = createStore<IStoreState>(
    application,
    prepareInitialState(getSavedNotes),
    applyMiddleware(logger)
  );

  store.subscribe(saveData(saveNotesData, store));

  return store;
};
