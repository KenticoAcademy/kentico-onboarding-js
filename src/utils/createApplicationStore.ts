import { application } from '../reducers/application';
import { IStoreState } from '../reducers/IStoreState';
import {
  applyMiddleware,
  compose,
  createStore
} from 'redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import { Store } from 'react-redux';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const createApplicationStore = (): Store<IStoreState> => {

  const store = createStore<IStoreState>(
    application,
    composeEnhancers(applyMiddleware(thunk, logger)),
  );

  return store;
};
