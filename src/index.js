import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { App } from './App.jsx';
import items from './reducers/items';
import { defaultListItems } from './constants/defaultListItems';
import expect from 'expect';
import {
  addItem,
  deleteItem,
} from './utils/actionCreators';

let store = createStore(items);
/*
const stateBefore = [];
const stateAfterAddOrBeforeRemove = [
  {
    id: '000',
    text: 'Item1',
    isBeingEdited: false,
  },
];
expect(items(stateBefore, addItem('Item1', '000'))).toEqual(stateAfterAddOrBeforeRemove);
expect(items(stateAfterAddOrBeforeRemove, deleteItem('000'))).toEqual(stateBefore);
*/
defaultListItems(store);
console.log(store.getState());

ReactDOM.render(
  <Provider store={store}>
    <App store={store} />
  </Provider>,
  document.getElementById('app-root')
);
