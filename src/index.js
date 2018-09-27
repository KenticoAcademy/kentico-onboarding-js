import React from 'react';
import ReactDOM from 'react-dom';
import {
  applyMiddleware,
  createStore,
} from 'redux';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import { App } from './containers/App.tsx';
import { root } from './reducers/root.ts';
import thunk from 'redux-thunk';

import '.././css/style.css';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';
import 'balloon-css/balloon.css';


const store = createStore(
  root,
  applyMiddleware(thunk, logger),
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app-root')
);
