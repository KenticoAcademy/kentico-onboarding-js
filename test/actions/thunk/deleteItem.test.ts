import { deleteItemFactory } from '../../../src/actions/thunk/deleteItemFactory';
import {
  assertThatDispatchWasCalledWithArgumentsInGiveOrder,
  fakeFunction,
  httpClientFailure,
  httpClientSuccessFactory,
} from './utils/utils';

const actionParams = {
  uri: '',
  id: '',
};

describe('deleteItem will call dispatch with', () => {
  it('delete item action', () => {
    const expectedActions = [
      'deleteItem',
    ];
    const httpClient = httpClientSuccessFactory();
    const deleteItemAction = jest.fn(() => expectedActions[0]);
    const deleteItem = deleteItemFactory({
      httpClient,
      deleteItem: deleteItemAction,
    });

    const dispatchableAction = deleteItem(actionParams);

    return assertThatDispatchWasCalledWithArgumentsInGiveOrder(dispatchableAction, expectedActions);
  });

  it('no action', () => {
    const expectedActions: string[] = [];
    const httpClient = httpClientFailure;
    const deleteItem = deleteItemFactory({
      httpClient,
      deleteItem: fakeFunction,
    });

    const dispatchableAction = deleteItem(actionParams);

    return assertThatDispatchWasCalledWithArgumentsInGiveOrder(dispatchableAction, expectedActions);
  });
});
