import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import {
  applyMiddleware,
  createStore,
} from 'redux';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import { App } from './containers/App.tsx';
import { root } from './reducers/root.ts';
import thunk from 'redux-thunk';

const store = createStore(
  root,
  applyMiddleware(thunk, logger),
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app-root')
);
