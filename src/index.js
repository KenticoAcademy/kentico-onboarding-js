import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import { App } from './App.jsx';
import { defaultListItems } from './constants/defaultListItems';
import { combinedReducers } from './reducers/combineReducers';

const store = createStore(
  combinedReducers,
  applyMiddleware(logger)
);

defaultListItems(store);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app-root')
);
