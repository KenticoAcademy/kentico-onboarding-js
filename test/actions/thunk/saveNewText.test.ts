import { saveNewTextFactory } from '../../../src/actions/thunk/saveNewTextFactory';
import {
  assertThatDispatchWasCalledWithArgumentsInGiveOrder,
  fakeFunction,
  fetchAlwaysFailFactory,
  fetchReturnsOkResponseFactory,
  fakeHandleErrors as handleErrors,
} from './utils/utils';
import { defaultUuid } from '../../../src/constants/defaultUuid';

const actionParams = {
  uri: '',
  id: defaultUuid,
  text: '',
};

describe('saveNewText will call dispatch with', () => {
  it('save item changes action', () => {
    const expectedActions = [
      'saveItemChanges',
    ];
    const fetch = fetchReturnsOkResponseFactory();
    const saveItemChanges = jest.fn(() => expectedActions[0]);
    const saveNewText = saveNewTextFactory({
      fetch,
      saveItemChanges,
      handleErrors,
    });

    const dispatchableAction = saveNewText(actionParams);

    return assertThatDispatchWasCalledWithArgumentsInGiveOrder(dispatchableAction, expectedActions);
  });

  it('no action', () => {
    const expectedActions: string[] = [
    ];
    const fetch = fetchAlwaysFailFactory();
    const saveNewText = saveNewTextFactory({
      fetch,
      handleErrors,
      saveItemChanges: fakeFunction,
    });

    const dispatchableAction = saveNewText(actionParams);

    return assertThatDispatchWasCalledWithArgumentsInGiveOrder(dispatchableAction, expectedActions);
  });
});
