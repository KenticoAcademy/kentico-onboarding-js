import *as React from 'react';
import { Provider } from 'react-redux';
import { App } from './App';
import {
  getSavedNotes,
  saveNotesData,
} from '../utils/localStorage';
import { createApplicationStore } from '../utils/createApplicationStore';

const Root: React.StatelessComponent = (): JSX.Element => (
  <Provider store={createApplicationStore(getSavedNotes, saveNotesData)}>
    <App />
  </Provider>
);

Root.displayName = 'Root';

export { Root };
