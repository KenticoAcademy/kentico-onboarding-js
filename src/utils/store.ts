import {
  applyMiddleware,
  createStore,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { logger } from 'redux-logger';
import { app as reducer } from '../reducers/app';
import { getInitialItems } from './getInitialItems';

export const initialItems = { board: { items: getInitialItems() } };

export const store = createStore(
  reducer,
  initialItems,
  composeWithDevTools(
    applyMiddleware(logger),
  ),
);
