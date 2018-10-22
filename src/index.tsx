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
import { createInitialState } from './utils/createInitialState';
import { App } from './components/App.tsx';
import { rootReducer } from './reducers/rootReducer';

export const initialState = createInitialState();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(logger))
);

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app-root')
);
