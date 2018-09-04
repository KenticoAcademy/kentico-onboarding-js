require.context('../public/', true);
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import ReactDom from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import {
  applyMiddleware,
  createStore
} from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Iterable } from 'immutable';
import { itemsReducer } from './reducers/itemsReducer';

const stateTransformer = (state) => {
  if (Iterable.isIterable(state)) {
    return state.toJS();
  }
  return state;
};

const logger = createLogger({
  stateTransformer,
});

const store = createStore(
  itemsReducer,
  undefined,
  composeWithDevTools(
    applyMiddleware(logger)
  ),
);
import { App } from './App.jsx';

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app-root'));
