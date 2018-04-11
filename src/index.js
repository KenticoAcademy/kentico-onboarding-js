import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.css';
import { application } from './reducers';

import { App } from './components/App.jsx';

const store = createStore(
  application,
  window.devToolsExtension ? window.devToolsExtension() : f => f,
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app-root')
);
