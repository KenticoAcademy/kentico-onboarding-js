import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import logger from 'redux-logger';
import { getInitialState } from './utils/getInitialState';
import {
  applyMiddleware,
  compose,
  createStore,
} from 'redux';
import { Provider } from 'react-redux';
import { app } from './reducers/app';

import { App } from './App.jsx';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [logger];

const store = createStore(app, getInitialState(), composeEnhancers(
  applyMiddleware(...middleware),
));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app-root'),
);
