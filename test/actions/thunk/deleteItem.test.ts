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
  it('closeItem and deleteItem actions', () => {
    const expectedActions = [
      'closeItem',
      'deleteItem',
    ];
    const httpClient = httpClientSuccessFactory();
    const closeItem = jest.fn(() => expectedActions[0]);
    const deleteItemAction = jest.fn(() => expectedActions[1]);
    const deleteItem = deleteItemFactory({
      uri,
      httpClient,
      closeItem,
      deleteItem: deleteItemAction,
      itemSyncFailed: fakeFunction,
    });

    const dispatchableAction = deleteItem(actionParams);

    return assertThatDispatchWasCalledWithArgumentsInGiveOrder(dispatchableAction, expectedActions);
  });

  it('closeItem and itemSyncFailed actions', () => {
    const expectedActions = [
      'closeItem',
      'itemSyncFailed',
    ];
    const httpClient = httpClientFailure;
    const closeItem = jest.fn(() => expectedActions[1]);
    const itemSyncFailed = jest.fn(() => expectedActions[2]);
    const deleteItem = deleteItemFactory({
      uri,
      httpClient,
      itemSyncFailed,
      closeItem,
      deleteItem: fakeFunction,
    });

    const dispatchableAction = deleteItem(actionParams);

    return assertThatDispatchWasCalledWithArgumentsInGiveOrder(dispatchableAction, expectedActions);
  });
});
