import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import { App } from './App';
import { store } from './utils/store';

ReactDOM.render((
    <Provider store={store}>
        <App />
    </Provider>
  ),
  document.getElementById('app-root')
);
