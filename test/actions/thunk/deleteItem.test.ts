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
  it('itemSyncRequested, closeItem and deleteItem actions', () => {
    const expectedActions = [
      'itemSyncRequested',
      'closeItem',
      'deleteItem',
    ];
    const httpClient = httpClientSuccessFactory();
    const itemSyncRequested = jest.fn(() => expectedActions[0]);
    const closeItem = jest.fn(() => expectedActions[1]);
    const deleteItemAction = jest.fn(() => expectedActions[2]);
    const deleteItem = deleteItemFactory({
      uri,
      httpClient,
      itemSyncRequested,
      closeItem,
      deleteItem: deleteItemAction,
      itemSyncFailed: fakeFunction,
    });

    const dispatchableAction = deleteItem(actionParams);

    return assertThatDispatchWasCalledWithArgumentsInGiveOrder(dispatchableAction, expectedActions);
  });

  it('itemSyncRequested, closeItem and itemSyncFailed actions', () => {
    const expectedActions = [
      'itemSyncRequested',
      'closeItem',
      'itemSyncFailed',
    ];
    const httpClient = httpClientFailure;
    const itemSyncRequested = jest.fn(() => expectedActions[0]);
    const closeItem = jest.fn(() => expectedActions[1]);
    const itemSyncFailed = jest.fn(() => expectedActions[2]);
    const deleteItem = deleteItemFactory({
      uri,
      httpClient,
      itemSyncFailed,
      itemSyncRequested,
      closeItem,
      deleteItem: fakeFunction,
    });

    const dispatchableAction = deleteItem(actionParams);

    return assertThatDispatchWasCalledWithArgumentsInGiveOrder(dispatchableAction, expectedActions);
  });
});
