import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import { app } from '../reducers/app';
import { createLogger } from 'redux-logger';
import { IAppState } from '../reducers/interfaces/IAppState';
import { IAction } from '../actions/IAction';
import thunk from 'redux-thunk';

const logger = createLogger({});

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore<IAppState, IAction, never, never>(
  app,
  composeEnhancers(applyMiddleware(thunk, logger))
);
