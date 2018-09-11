import {
  applyMiddleware,
  createStore
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { logger } from 'redux-logger';
import { list as reducer } from '../reducers/list';
import { getInitialItems } from './getInitialItems';

export const initialItems = { items: getInitialItems() };

export const store = createStore(
  reducer,
  initialItems,
  composeWithDevTools(
    applyMiddleware(logger)
  ),
);
