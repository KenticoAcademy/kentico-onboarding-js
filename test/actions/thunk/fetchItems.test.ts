import { IListItem } from '../../../src/models/interfaces/IListItem';
import { ListItem } from '../../../src/models/classes/ListItem';
import { fetchItemsFactory } from '../../../src/actions/thunk/fetchItemsFactory';
import {
  assertThatDispatchWasCalledWithActions,
  dispatchFactory, fakeFunction, fetchAlwaysFailFactory, fetchReturnsOkResponseFactory,
  handleErrors
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
    const fetchItems = fetchItemsFactory(fetch)(requestItems)(receiveItems)(fakeFunction)(fakeFunction)(fakeFunction)(handleErrors);
    const dispatch = dispatchFactory();

    const dispatchableFetchItems = fetchItems(uri);

    return assertThatDispatchWasCalledWithActions(dispatchableFetchItems, dispatch, expectedActions);
  });

  it('request items, notify error and fetch failed actions', () => {
    const expectedActions = [
      'requestItems',
      'notifyError',
      'fetchFailed',
    ];
    const uri = '';
    const fetch = fetchAlwaysFailFactory();
    const requestItems = jest.fn(() => expectedActions[0]);
    const notifyError = jest.fn(() => expectedActions[1]);
    const fetchFailed = jest.fn(() => expectedActions[2]);
    const fetchItems = fetchItemsFactory(fetch)(requestItems)(fakeFunction)(notifyError)(fetchFailed)(fakeFunction)(handleErrors);
    const dispatch = dispatchFactory();

    const dispatchableFetchItems = fetchItems(uri);

    return assertThatDispatchWasCalledWithActions(dispatchableFetchItems, dispatch, expectedActions);
  });
});
