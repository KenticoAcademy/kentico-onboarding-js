import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {
  applyMiddleware,
  compose,
  createStore,
} from 'redux';
import { Provider } from 'react-redux';
import { app } from './reducers/app';
import { App } from './containers/App';

interface IDevTools {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: <R>(a: R) => R;
}

const composeEnhancers = (window as IDevTools).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(app, {}, composeEnhancers(
  applyMiddleware(logger, thunkMiddleware),
));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app-root'),
);
