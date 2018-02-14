import 'raf-polyfill';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { OrderedMap } from 'immutable';
import { App } from '../src/components/App';
import { FetchItemsState } from '../src/models/enums/FetchItemsState';
import { IAppState } from '../src/models/state/IAppState';
import { ListItem } from '../src/models/classes/ListItem';
import { Message } from '../src/models/classes/Message';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const fakeReducer = (): IAppState => ({
    list: {
      items: OrderedMap<string, ListItem>(),
      fetchItemsState: FetchItemsState.INITIAL,
      message: new Message(),
    },
  });
  const fakeStore = createStore(fakeReducer);


  ReactDOM.render(
    <Provider store={fakeStore}>
      <App />
    </Provider>,
    div);
});
