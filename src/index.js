import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducers } from './reducers';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import { App } from './App.jsx';

const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>,
  document.getElementById('app-root')
);
