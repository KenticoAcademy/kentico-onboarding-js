import { ListItem } from '../../../src/models/classes/ListItem';
import { cancelItemFactory } from '../../../src/actions/thunk/cancelItemFactory';
import {
  assertThatDispatchWasCalledWithActions, dispatchFactory, fakeFunction, fetchAlwaysFailFactory,
  fetchReturnsOkResponseFactory,
  handleErrors
} from './utils/utils';

describe('cancelItem will call dispatch with', () => {
  it('cancel item changes action', () => {
    const expectedActions = [
      'cancelItemChanges',
    ];
    const uri = '';
    const item: ListItem = new ListItem({});
    const fetch = fetchReturnsOkResponseFactory();
    const cancelItemChanges = jest.fn(() => expectedActions[0]);
    const cancelItem = cancelItemFactory(fetch)(cancelItemChanges)(fakeFunction)(fakeFunction)(handleErrors);
    const dispatch = dispatchFactory();

    const dispatchableCancelItem = cancelItem(uri, item);

    return assertThatDispatchWasCalledWithActions(dispatchableCancelItem, dispatch, expectedActions);
  });

  it('notify error action', () => {
    const expectedActions = [
      'notifyError',
    ];
    const uri = '';
    const item: ListItem = new ListItem({});
    const fetch = fetchAlwaysFailFactory();
    const notifyError = jest.fn(() => expectedActions[0]);
    const cancelItem = cancelItemFactory(fetch)(fakeFunction)(notifyError)(fakeFunction)(handleErrors);
    const dispatch = dispatchFactory();

    const dispatchableCancelItem = cancelItem(uri, item);

    return assertThatDispatchWasCalledWithActions(dispatchableCancelItem, dispatch, expectedActions);
  });
});
