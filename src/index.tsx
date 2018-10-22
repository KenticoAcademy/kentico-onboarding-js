require.context('../public/', true);
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import * as ReactDom from 'react-dom';
import * as React from 'react';
import {
  applyMiddleware,
  createStore,
  compose,
} from 'redux';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import { createInitialState } from './utils/createInitialState';
import { App } from './components/App';
import { rootReducer } from './reducers/rootReducer';

export const initialState = createInitialState();
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(logger)),
);

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app-root'),
);
