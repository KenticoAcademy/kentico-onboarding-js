import { ListItem } from '../../../src/models/classes/ListItem';
import { cancelItemFactory } from '../../../src/actions/thunk/cancelItemFactory';
import {
  assertThatDispatchWasCalledWithActions,
  configurationObjectBase,
  dispatchFactory,
  fakeFunction,
  fetchAlwaysFailFactory,
  fetchReturnsOkResponseFactory,
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
    const cancelItem = cancelItemFactory({
        ...configurationObjectBase,
      fetch,
      cancelItemChanges,
    });
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
    const cancelItem = cancelItemFactory({
      ...configurationObjectBase,
      fetch,
      notifyError,
      cancelItemChanges: fakeFunction,
    });
    const dispatch = dispatchFactory();

    const dispatchableCancelItem = cancelItem(uri, item);

    return assertThatDispatchWasCalledWithActions(dispatchableCancelItem, dispatch, expectedActions);
  });
});
