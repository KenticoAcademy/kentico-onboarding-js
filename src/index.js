import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import 'es6-promise/auto';
import { reducers } from './reducers/index.ts';
import { initialState } from './constants/initialState.ts';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.css';

import { App } from './components/App.tsx';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  initialState,
  composeEnhancers(
    applyMiddleware(
      logger,
      thunkMiddleware,
    ),
  )
);

ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>,
  document.getElementById('app-root')
);
