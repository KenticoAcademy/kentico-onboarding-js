import 'raf-polyfill';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { OrderedMap } from 'immutable';
import { App } from '../src/App';
import { FetchItemsState } from '../src/models/FetchItemsState';
import { IAppState } from '../src/models/IAppState';
import { ListItem } from '../src/models/ListItem';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const fakeReducer = (): IAppState => ({
    list: {
      items: OrderedMap<string, ListItem>(),
      fetchItemsState: FetchItemsState.INITIAL,
    },
  });
  const fakeStore = createStore(fakeReducer);


  ReactDOM.render(
    <Provider store={fakeStore}>
      <App />
    </Provider>,
    div);
});
