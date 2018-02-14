import {
  applyMiddleware,
  compose,
  createStore,
} from 'redux';
import { reducers } from '../reducers';
import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const configureStore = () => createStore(
  reducers,
  composeEnhancers(
    applyMiddleware
    (
      thunkMiddleware,
      logger,
    ),
  )
);
