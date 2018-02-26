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
  it('deleteItemRequest and deleteItemConfirm actions', () => {
    const expectedActions = [
      'deleteItemRequest',
      'deleteItemConfirm',
    ];
    const httpClient = httpClientSuccessFactory();
    const deleteItemRequest = jest.fn(() => expectedActions[0]);
    const deleteItemConfirm = jest.fn(() => expectedActions[1]);
    const deleteItem = deleteItemFactory({
      uri,
      httpClient,
      deleteItemRequest,
      deleteItemConfirm,
      itemSyncFailed: fakeFunction,
    });

    const dispatchableAction = deleteItem(actionParams);

    return assertThatDispatchWasCalledWithArgumentsInGiveOrder(dispatchableAction, expectedActions);
  });

  it('deleteItemRequest and itemSyncFailed actions', () => {
    const expectedActions = [
      'deleteItemRequest',
      'itemSyncFailed',
    ];
    const httpClient = httpClientFailure;
    const deleteItemRequest = jest.fn(() => expectedActions[0]);
    const itemSyncFailed = jest.fn(() => expectedActions[1]);
    const deleteItem = deleteItemFactory({
      uri,
      httpClient,
      itemSyncFailed,
      deleteItemRequest,
      deleteItemConfirm: fakeFunction,
    });

    const dispatchableAction = deleteItem(actionParams);

    return assertThatDispatchWasCalledWithArgumentsInGiveOrder(dispatchableAction, expectedActions);
  });
});
