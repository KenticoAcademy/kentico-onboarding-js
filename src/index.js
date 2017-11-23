import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { App } from './App.jsx';
import items from './reducers/items';
import { defaultListItems } from './constants/defaultListItems';

let store = createStore(items);
defaultListItems(store);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app-root')
);
