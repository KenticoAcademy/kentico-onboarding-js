import { deleteItemFactory } from '../../../src/actions/thunk/deleteItemFactory';
import {
  assertThatDispatchWasCalledWithArgumentsInGiveOrder,
  fakeFunction,
  httpClientFailure,
  httpClientSuccessFactory,
} from './utils/utils';

const actionParams = {
  id: '',
};
const uri = '';

describe('deleteItem will call dispatch with', () => {
  it('item sync requested and delete item actions', () => {
    const expectedActions = [
      'itemSyncRequested',
      'deleteItem',
    ];
    const httpClient = httpClientSuccessFactory();
    const itemSyncRequested = jest.fn(() => expectedActions[0]);
    const deleteItemAction = jest.fn(() => expectedActions[1]);
    const deleteItem = deleteItemFactory({
      uri,
      httpClient,
      itemSyncRequested,
      deleteItem: deleteItemAction,
      itemSyncFailed: fakeFunction,
    });

    const dispatchableAction = deleteItem(actionParams);

    return assertThatDispatchWasCalledWithArgumentsInGiveOrder(dispatchableAction, expectedActions);
  });

  it('item sync requested and item sync failed actions', () => {
    const expectedActions = [
      'itemSyncRequested',
      'itemSyncFailed',
    ];
    const httpClient = httpClientFailure;
    const itemSyncRequested = jest.fn(() => expectedActions[0]);
    const itemSyncFailed = jest.fn(() => expectedActions[1]);
    const deleteItem = deleteItemFactory({
      uri,
      httpClient,
      itemSyncFailed,
      itemSyncRequested,
      deleteItem: fakeFunction,
    });

    const dispatchableAction = deleteItem(actionParams);

    return assertThatDispatchWasCalledWithArgumentsInGiveOrder(dispatchableAction, expectedActions);
  });
});
