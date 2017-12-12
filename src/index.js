import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { reducers } from './reducers';
import { initialState } from './constants/initialState';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import { App } from './App.jsx';

const logger = store => next => action => {
  console.group(action.type);
  console.info('dispatching ', action);
  const result = next(action);
  console.log('next state', store.getState());
  console.groupEnd(action.type);
  return result;
};

const store = createStore(reducers, initialState, applyMiddleware(logger));

ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>,
  document.getElementById('app-root')
);
