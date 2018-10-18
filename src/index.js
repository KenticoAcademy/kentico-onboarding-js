import 'balloon-css/balloon.css';
import React from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';
import 'react-s-alert/dist/s-alert-default.css';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import '.././css/style.css';
import { App } from './containers/App.tsx';
import { root } from './reducers/root.ts';


const store = createStore(root, applyMiddleware(thunk, logger));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('app-root')
);
