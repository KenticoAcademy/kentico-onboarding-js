import { ListItem } from '../../../src/models/classes/ListItem';
import { changeItemOpenStateFactory } from '../../../src/actions/thunk/changeItemOpenStateFactory';
import {
  assertThatDispatchWasCalledWithArgumentsInGiveOrder,
  fakeFunction,
  fetchAlwaysFailFactory,
  fetchReturnsOkResponseFactory,
  fakeHandleErrors as handleErrors,
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
      fetch,
      changeItemOpenState: changeItemOpenStateAction,
      notifyError: fakeFunction,
      registerAction: fakeFunction,
      handleErrors,
    });
    const dispatchableAction = changeItemOpenState(uri, item);

    return assertThatDispatchWasCalledWithArgumentsInGiveOrder(dispatchableAction, expectedActions);
  });

  it('notify error and register action actions', () => {
    const expectedActions = [
      'registerAction',
      'notifyError',
    ];
    const uri = '';
    const item: ListItem = new ListItem({});
    const fetch = fetchAlwaysFailFactory();
    const registerAction = jest.fn(() => expectedActions[0]);
    const notifyError = jest.fn(() => expectedActions[1]);
    const changeItemOpenState = changeItemOpenStateFactory({
      fetch,
      notifyError,
      registerAction,
      handleErrors,
      changeItemOpenState: fakeFunction,
    });

    const dispatchableAction = changeItemOpenState(uri, item);

    return assertThatDispatchWasCalledWithArgumentsInGiveOrder(dispatchableAction, expectedActions);
  });
});
