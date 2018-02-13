import { saveNewTextFactory } from '../../../src/actions/thunk/saveNewTextFactory';
import { ListItem } from '../../../src/models/classes/ListItem';
import {
  assertThatDispatchWasCalledWithArgumentsInGiveOrder,
  fakeFunction,
  fetchAlwaysFailFactory,
  fetchReturnsOkResponseFactory,
  fakeHandleErrors as handleErrors,
} from './utils/utils';

const actionParams = {
  uri: '',
  item: new ListItem(),
  text: '',
};

describe('saveNewText will call dispatch with', () => {
  it('notify success and save item changes actions', () => {
    const expectedActions = [
      'notifySuccess',
      'saveItemChanges',
    ];
    const fetch = fetchReturnsOkResponseFactory();
    const notifySuccess = jest.fn(() => expectedActions[0]);
    const saveItemChanges = jest.fn(() => expectedActions[1]);
    const saveNewText = saveNewTextFactory({
      fetch,
      notifySuccess,
      saveItemChanges,
      handleErrors,
      notifyError: fakeFunction,
      registerAction: fakeFunction,
    });

    const dispatchableAction = saveNewText(actionParams);

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
    const saveNewText = saveNewTextFactory({
      fetch,
      notifyError,
      handleErrors,
      registerAction,
      saveItemChanges: fakeFunction,
      notifySuccess: fakeFunction,
    });

    const dispatchableAction = saveNewText(actionParams);

    return assertThatDispatchWasCalledWithArgumentsInGiveOrder(dispatchableAction, expectedActions);
  });
});
