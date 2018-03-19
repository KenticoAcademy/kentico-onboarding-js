import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';

import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.css';
import { application } from './reducers/index';

import { App } from './components/App.jsx';

const store = createStore(
  application,
  compose(
    applyMiddleware(logger),
    window.devToolsExtension ? window.devToolsExtension() : f => f)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app-root')
);
