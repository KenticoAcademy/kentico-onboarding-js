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
import { IAppState } from './state/IAppState';
import { Actions } from '../actions/types/itemsActionTypes';

export const appStore: Store<IAppState, Actions> = createStore(
  todoApp,
  initialState,
  composeWithDevTools(applyMiddleware(thunk, logger)),
);
