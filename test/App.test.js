import React from 'react';
import ReactDOM from 'react-dom';
import { App } from '../src/App.tsx';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { root } from '../src/reducers/root.ts';

if (typeof window !== 'undefined') {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const store = createStore(root);
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>
      , div);
  });
}

