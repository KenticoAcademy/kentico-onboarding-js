require.context('../public/', true);
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import ReactDom from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import {
  applyMiddleware,
  createStore
} from 'redux';
import logger from 'redux-logger';
import { itemsReducer } from './reducers/itemsReducer';

const store = createStore(
  itemsReducer,
  undefined,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(logger),
);
import { App } from './App.jsx';

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app-root'));
