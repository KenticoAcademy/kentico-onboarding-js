import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  applyMiddleware,
  createStore,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.css';
import { application } from './reducers/index.ts';

import { App } from './components/App.tsx';

const store = createStore(
  application,
  composeWithDevTools(
    applyMiddleware(thunk)
  ),
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app-root')
);
