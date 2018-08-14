import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import { app } from '../reducers/app';
import { createLogger } from 'redux-logger';
import { getDefaultList } from './getDefaultList';
import { IAppState } from '../reducers/interfaces/IAppState';

const logger = createLogger({});

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const getPreloadedState = (): IAppState => ({
  list: {
    items: getDefaultList(),
  }
});

export const store = createStore(
  app,
  getPreloadedState(),
  composeEnhancers(applyMiddleware(logger))
);
