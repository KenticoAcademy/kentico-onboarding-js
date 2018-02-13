import { deleteItemFactory } from '../../../src/actions/thunk/deleteItemFactory';
import {
  assertThatDispatchWasCalledWithArgumentsInGiveOrder,
  fakeFunction,
  fetchAlwaysFailFactory,
  fetchReturnsOkResponseFactory,
  fakeHandleErrors as handleErrors,
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
    const fetch = fetchReturnsOkResponseFactory();
    const deleteItemAction = jest.fn(() => expectedActions[0]);
    const deleteItem = deleteItemFactory({
      fetch,
      handleErrors,
      deleteItem: deleteItemAction,
    });

    const dispatchableAction = deleteItem(actionParams);

    return assertThatDispatchWasCalledWithArgumentsInGiveOrder(dispatchableAction, expectedActions);
  });

  it('no action', () => {
    const expectedActions: string[] = [];
    const fetch = fetchAlwaysFailFactory();
    const deleteItem = deleteItemFactory({
      fetch,
      handleErrors,
      deleteItem: fakeFunction,
    });

    const dispatchableAction = deleteItem(actionParams);

    return assertThatDispatchWasCalledWithArgumentsInGiveOrder(dispatchableAction, expectedActions);
  });
});
