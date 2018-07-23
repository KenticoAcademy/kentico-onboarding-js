import {
  createStore,
  applyMiddleware
} from 'redux';
import { AppReducer } from '../reducers/AppReducer';
import { createLogger } from 'redux-logger';
import { getDefaultList } from './getDefaultList';

//export const store = createStore(AppReducer);

const logger = createLogger({});

export const store = createStore(
  AppReducer,
  { list: getDefaultList() },
  applyMiddleware(logger)
);
