import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createLogger from 'redux-logger';

import App from '../src/App.tsx';
import { rootReducer } from '../src/reducers/rootReducer.ts';

xit('renders without crashing', () => {
  const div = document.createElement('div');
  const logger = createLogger();
  const store = createStore(rootReducer, applyMiddleware(logger));
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    div);
});
