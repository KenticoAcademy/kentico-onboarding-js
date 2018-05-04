import * as React from 'react';
import { Provider } from 'react-redux';
import { createApplicationStore } from '../utils/createApplicationStore';
import { NotesApplication } from '../containers-redux/notesApplication/Application';

const Root: React.StatelessComponent = (): JSX.Element => (
  <Provider store={createApplicationStore()}>
    <NotesApplication />
  </Provider>
);

Root.displayName = 'Root';

export { Root };
