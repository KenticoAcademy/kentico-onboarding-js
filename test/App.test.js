import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  applyMiddleware,
  createStore
} from 'redux';
import { root } from '../src/reducers/root.ts';
import thunk from 'redux-thunk';
import { App } from '../src/containers/App.tsx';

describe('App', () => {
  it('renders without crashing', () => {
    if (typeof window !== 'undefined') {
      const div = document.createElement('div');
      const store = createStore(
        root,
        applyMiddleware(thunk),
      );

      ReactDOM.render(
        <Provider store={store}>
          <App />
        </Provider>
        , div);
    }
    expect.anything();
  });
});

