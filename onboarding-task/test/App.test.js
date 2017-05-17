import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/App.tsx';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createLogger from 'redux-logger';
import { itemsListReducer } from '../src/reducers/itemsListReducer.ts';


xit('renders without crashing', () => {
  const div = document.createElement('div');
  const logger = createLogger();
  const store = createStore(itemsListReducer, applyMiddleware(logger));
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    div);
});
