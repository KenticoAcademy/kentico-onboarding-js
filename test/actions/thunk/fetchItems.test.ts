import { IListItem } from '../../../src/models/interfaces/IListItem';
import { ListItem } from '../../../src/models/classes/ListItem';
import { fetchItemsFactory } from '../../../src/actions/thunk/fetchItemsFactory';
import {
  assertThatDispatchWasCalledWithActions,
  configurationObjectBase,
  dispatchFactory,
  fakeFunction,
  fetchAlwaysFailFactory,
  fetchReturnsOkResponseFactory,
} from './utils/utils';

describe('fetchItems will call dispatch with', () => {
  it('request items and receive items actions', () => {
    const expectedActions = [
      'requestItems',
      'receiveItems',
    ];
    const uri = '';
    const items: IListItem[] = [
      new ListItem({}),
    ];
    const fetch = fetchReturnsOkResponseFactory(items);
    const requestItems = jest.fn(() => expectedActions[0]);
    const receiveItems = jest.fn(() => expectedActions[1]);
    const fetchItems = fetchItemsFactory({
      ...configurationObjectBase,
      fetch,
      requestItems,
      receiveItems,
      fetchFailed: fakeFunction,
    });
    const dispatch = dispatchFactory();

    const dispatchableFetchItems = fetchItems(uri);

    return assertThatDispatchWasCalledWithActions(dispatchableFetchItems, dispatch, expectedActions);
  });

  it('request items, notify error and fetch failed actions', () => {
    const expectedActions = [
      'requestItems',
      'fetchFailed',
    ];
    const uri = '';
    const fetch = fetchAlwaysFailFactory();
    const requestItems = jest.fn(() => expectedActions[0]);
    const fetchFailed = jest.fn(() => expectedActions[1]);
    const fetchItems = fetchItemsFactory({
      ...configurationObjectBase,
      fetch,
      requestItems,
      fetchFailed,
      receiveItems: fakeFunction,
    });
    const dispatch = dispatchFactory();

    const dispatchableFetchItems = fetchItems(uri);

    return assertThatDispatchWasCalledWithActions(dispatchableFetchItems, dispatch, expectedActions);
  });
});
