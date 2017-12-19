import 'raf-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { OrderedMap } from 'immutable';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { App } from '../src/App.jsx';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const fakeReducer = () => ({
    list: {
      items: OrderedMap(),
    },
  });
  const fakeStore = createStore(fakeReducer);

  ReactDOM.render(
    <Provider store={fakeStore}>
      <App />
    </Provider>, div);
});
