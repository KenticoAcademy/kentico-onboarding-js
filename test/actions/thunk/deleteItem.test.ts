import { deleteItemFactory } from '../../../src/actions/thunk/deleteItemFactory';
import {
  assertThatDispatchWasCalledWithActions, dispatchFactory, fakeFunction, fetchAlwaysFailFactory,
  fetchReturnsOkResponseFactory,
  handleErrors
} from './utils/utils';

describe('deleteItem will call dispatch with', () => {
  it('notify success and delete item actions', () => {
    const expectedActions = [
      'notifySuccess',
      'deleteItem',
    ];
    const uri = '';
    const id = '';
    const fetch = fetchReturnsOkResponseFactory();
    const notifySuccess = jest.fn(() => expectedActions[0]);
    const deleteItemAction = jest.fn(() => expectedActions[1]);
    const deleteItem = deleteItemFactory(fetch)(deleteItemAction)(notifySuccess)(fakeFunction)(fakeFunction)(handleErrors);
    const dispatch = dispatchFactory();

    const dispatchableDeleteItem = deleteItem(uri, id);

    return assertThatDispatchWasCalledWithActions(dispatchableDeleteItem, dispatch, expectedActions);
  });

  it('notify error action', () => {
    const expectedActions = [
      'notifyError',
    ];
    const uri = '';
    const id = '';
    const fetch = fetchAlwaysFailFactory();
    const notifyError = jest.fn(() => expectedActions[0]);
    const deleteItem = deleteItemFactory(fetch)(fakeFunction)(fakeFunction)(notifyError)(fakeFunction)(handleErrors);
    const dispatch = dispatchFactory();

    const dispatchableDeleteItem = deleteItem(uri, id);

    return assertThatDispatchWasCalledWithActions(dispatchableDeleteItem, dispatch, expectedActions);
  });
});
