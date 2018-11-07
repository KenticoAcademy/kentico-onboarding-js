import {
  applyMiddleware,
  createStore,
  Store,
} from 'redux';
import thunk from 'redux-thunk';
import { todoApp } from '../reducers/todoApp';
import { composeWithDevTools } from 'redux-devtools-extension';
import { logger } from 'redux-logger';
import { initialState } from './state/initialState';

export const appStore: Store = createStore(
  todoApp,
  initialState,
  composeWithDevTools(applyMiddleware(logger, thunk)),
);
