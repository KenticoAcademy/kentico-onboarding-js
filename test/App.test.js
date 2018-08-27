import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { root } from '../src/reducers/root.ts';
import thunk from 'redux-thunk';
import { App } from '../src/containers/App.ts';

if (typeof window !== 'undefined') {
  it('renders without crashing', () => {
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
  });
  expect.anything();
}

