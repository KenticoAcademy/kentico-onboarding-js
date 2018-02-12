import { ListItem } from '../../../src/models/classes/ListItem';
import { changeItemOpenStateFactory } from '../../../src/actions/thunk/changeItemOpenStateFactory';
import {
  assertThatDispatchWasCalledWithActions,
  configurationObjectBase,
  dispatchFactory,
  fakeFunction,
  fetchAlwaysFailFactory,
  fetchReturnsOkResponseFactory,
} from './utils/utils';

describe('changeItemOpenState will call dispatch with', () => {
  it('change item open state action', () => {
    const expectedActions = [
      'changeItemOpenState',
    ];
    const uri = '';
    const item: ListItem = new ListItem({});
    const fetch = fetchReturnsOkResponseFactory();
    const changeItemOpenStateAction = jest.fn(() => expectedActions[0]);
    const changeItemOpenState = changeItemOpenStateFactory({
      ...configurationObjectBase,
      fetch,
      changeItemOpenState: changeItemOpenStateAction,
      notifyError: fakeFunction,
    });
    const dispatch = dispatchFactory();

    const dispatchableCancelItem = changeItemOpenState(uri, item);

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
    const changeItemOpenState = changeItemOpenStateFactory({
      ...configurationObjectBase,
      fetch,
      notifyError,
      changeItemOpenState: fakeFunction,
    });
    const dispatch = dispatchFactory();

    const dispatchableCancelItem = changeItemOpenState(uri, item);

    return assertThatDispatchWasCalledWithActions(dispatchableCancelItem, dispatch, expectedActions);
  });
});
