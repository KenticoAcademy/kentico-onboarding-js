import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import 'bootstrap/dist/css/bootstrap.css';

import './index.css';
import App from './App.tsx';
import { itemsReducer } from './reducers/itemsReducer.ts';

const logger = createLogger();
const store = createStore(itemsReducer, applyMiddleware(logger, thunk));


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app-root')
);
