require.context('../public/', true);
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import ReactDom from 'react-dom';
import React from 'react';
import {
  applyMiddleware,
  createStore,
  compose
} from 'redux';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import { App } from './components/App.jsx';
import { list } from './reducers/list';
import { initialState } from './models/initialState';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  list,
  initialState,
  composeEnhancers(applyMiddleware(logger))
);

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app-root')
);
