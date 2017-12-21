import 'raf-polyfill';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Map, OrderedMap } from 'immutable';
import { App } from '../src/App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const fakeReducer = () => ({
    list: {
      items: OrderedMap<string, Map<string, any>>(),
    },
  });
  const fakeStore = createStore(fakeReducer);


  ReactDOM.render(
    <Provider store={fakeStore}>
      <App />
    </Provider>,
    div);
});
