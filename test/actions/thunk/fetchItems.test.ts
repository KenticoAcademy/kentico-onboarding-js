import { ListItem } from '../../../src/models/classes/ListItem';
import { fetchItemsFactory } from '../../../src/actions/thunk/fetchItemsFactory';
import {
  assertThatDispatchWasCalledWithArgumentsInGiveOrder,
  fakeFunction,
  httpClientSuccessFactory,
  httpClientFailure,
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

    const httpClient = httpClientSuccessFactory(actionParams.items);
    const requestItems = jest.fn(() => expectedActions[0]);
    const receiveItems = jest.fn(() => expectedActions[1]);
    const fetchItems = fetchItemsFactory({
      httpClient,
      requestItems,
      receiveItems,
      fetchFailed: fakeFunction,
    });

    const dispatchableAction = fetchItems(actionParams);

    return assertThatDispatchWasCalledWithArgumentsInGiveOrder(dispatchableAction, expectedActions);
  });

  it('request items and fetch failed actions', () => {
    const expectedActions = [
      'requestItems',
      'fetchFailed',
    ];
    const httpClient = httpClientFailure;
    const requestItems = jest.fn(() => expectedActions[0]);
    const fetchFailed = jest.fn(() => expectedActions[1]);
    const fetchItems = fetchItemsFactory({
      httpClient,
      requestItems,
      fetchFailed,
      receiveItems: fakeFunction,
    });

    const dispatchableAction = fetchItems(actionParams);

    return assertThatDispatchWasCalledWithArgumentsInGiveOrder(dispatchableAction, expectedActions);
  });
});
