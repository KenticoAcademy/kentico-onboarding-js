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
  it('notify success and delete item actions', () => {
    const expectedActions = [
      'notifySuccess',
      'deleteItem',
    ];
    const fetch = fetchReturnsOkResponseFactory();
    const notifySuccess = jest.fn(() => expectedActions[0]);
    const deleteItemAction = jest.fn(() => expectedActions[1]);
    const deleteItem = deleteItemFactory({
      fetch,
      notifySuccess,
      handleErrors,
      deleteItem: deleteItemAction,
      notifyError: fakeFunction,
      registerAction: fakeFunction,
    });

    const dispatchableAction = deleteItem(actionParams);

    return assertThatDispatchWasCalledWithArgumentsInGiveOrder(dispatchableAction, expectedActions);
  });

  it('notify error action', () => {
    const expectedActions = [
      'registerAction',
      'notifyError',
    ];
    const fetch = fetchAlwaysFailFactory();
    const registerAction = jest.fn(() => expectedActions[0]);
    const notifyError = jest.fn(() => expectedActions[1]);
    const deleteItem = deleteItemFactory({
      fetch,
      registerAction,
      notifyError,
      handleErrors,
      notifySuccess: fakeFunction,
      deleteItem: fakeFunction,
    });

    const dispatchableAction = deleteItem(actionParams);

    return assertThatDispatchWasCalledWithArgumentsInGiveOrder(dispatchableAction, expectedActions);
  });
});
