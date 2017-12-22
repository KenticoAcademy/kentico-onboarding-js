import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import 'es6-promise/auto';
import { reducers } from './reducers/index.ts';
import { initialState } from './constants/initialState.ts';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import { App } from './App.tsx';

const store = createStore(reducers, initialState, applyMiddleware(logger));

ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>,
  document.getElementById('app-root')
);
