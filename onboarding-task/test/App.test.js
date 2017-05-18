import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import App from '../src/App.tsx';
import { rootReducer } from '../src/reducers/rootReducer.ts';

// logs errorMessages into test console output for the inaccessibility of server
xit('renders without crashing', () => {
  const div = document.createElement('div');
  const logger = createLogger();
  const store = createStore(rootReducer, applyMiddleware(logger, thunk));
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    div);
});
