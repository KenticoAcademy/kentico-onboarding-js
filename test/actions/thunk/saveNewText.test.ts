import { saveNewTextFactory } from '../../../src/actions/thunk/saveNewTextFactory';
import {
  assertThatDispatchWasCalledWithArgumentsInGiveOrder,
  fakeFunction,
  httpClientFailure,
  httpClientSuccessFactory,
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
    const httpClient = httpClientSuccessFactory();
    const saveItemChanges = jest.fn(() => expectedActions[0]);
    const saveNewText = saveNewTextFactory({
      httpClient,
      saveItemChanges,
    });

    const dispatchableAction = saveNewText(actionParams);

    return assertThatDispatchWasCalledWithArgumentsInGiveOrder(dispatchableAction, expectedActions);
  });

  it('no action', () => {
    const expectedActions: string[] = [
    ];
    const httpClient = httpClientFailure;
    const saveNewText = saveNewTextFactory({
      httpClient,
      saveItemChanges: fakeFunction,
    });

    const dispatchableAction = saveNewText(actionParams);

    return assertThatDispatchWasCalledWithArgumentsInGiveOrder(dispatchableAction, expectedActions);
  });
});
