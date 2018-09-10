require.context('../public/', true);
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import * as ReactDom from 'react-dom';
import * as React from 'react';
import { Provider } from 'react-redux';
import { store } from './utils/store';
import { App } from './App';

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app-root'));
