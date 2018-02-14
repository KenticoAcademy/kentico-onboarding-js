import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'es6-promise/auto';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.css';
import { configureStore } from './utils/configureStore.ts';

import { App } from './components/App.tsx';

const store = configureStore();

ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>,
  document.getElementById('app-root')
);
