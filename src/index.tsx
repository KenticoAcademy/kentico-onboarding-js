import { getAllItems } from './actions/thunkActions/getAllItems';

require.context('../public/', true);

import { Provider } from 'react-redux';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import * as ReactDom from 'react-dom';
import * as React from 'react';

import { store } from './store/store';
import { App } from './components/App';

store.dispatch(getAllItems());
ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app-root'));
