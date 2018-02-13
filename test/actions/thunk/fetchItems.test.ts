import { ListItem } from '../../../src/models/classes/ListItem';
import { fetchItemsFactory } from '../../../src/actions/thunk/fetchItemsFactory';
import {
  assertThatDispatchWasCalledWithArgumentsInGiveOrder,
  fakeFunction,
  fetchAlwaysFailFactory,
  fetchReturnsOkResponseFactory,
  fakeHandleErrors as handleErrors,
} from './utils/utils';

const actionParams = {
  uri: '',
  items:
    [
      new ListItem(),
    ],
};

describe('fetchItems will call dispatch with', () => {
  it('request items and receive items actions', () => {
    const expectedActions = [
      'requestItems',
      'receiveItems',
    ];

    const fetch = fetchReturnsOkResponseFactory(actionParams.items);
    const requestItems = jest.fn(() => expectedActions[0]);
    const receiveItems = jest.fn(() => expectedActions[1]);
    const fetchItems = fetchItemsFactory({
      fetch,
      requestItems,
      receiveItems,
      handleErrors,
      fetchFailed: fakeFunction,
      registerAction: fakeFunction,
    });

    const dispatchableAction = fetchItems(actionParams);

    return assertThatDispatchWasCalledWithArgumentsInGiveOrder(dispatchableAction, expectedActions);
  });

  it('request items, notify error and fetch failed actions', () => {
    const expectedActions = [
      'requestItems',
      'registerAction',
      'fetchFailed',
    ];
    const fetch = fetchAlwaysFailFactory();
    const requestItems = jest.fn(() => expectedActions[0]);
    const registerAction = jest.fn(() => expectedActions[1]);
    const fetchFailed = jest.fn(() => expectedActions[2]);
    const fetchItems = fetchItemsFactory({
      fetch,
      requestItems,
      fetchFailed,
      handleErrors,
      registerAction,
      receiveItems: fakeFunction,
    });

    const dispatchableAction = fetchItems(actionParams);

    return assertThatDispatchWasCalledWithArgumentsInGiveOrder(dispatchableAction, expectedActions);
  });
});
