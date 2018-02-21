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
  it('save item changes and item sync succeeded actions', () => {
    const expectedActions = [
      'saveItemChanges',
      'itemSyncSucceeded',
    ];
    const httpClient = httpClientSuccessFactory();
    const saveItemChanges = jest.fn(() => expectedActions[0]);
    const itemSyncSucceeded = jest.fn(() => expectedActions[1]);
    const saveNewText = saveNewTextFactory({
      httpClient,
      saveItemChanges,
      itemSyncSucceeded,
      itemSyncFailed: fakeFunction,
    });

    const dispatchableAction = saveNewText(actionParams);

    return assertThatDispatchWasCalledWithArgumentsInGiveOrder(dispatchableAction, expectedActions);
  });

  it('save item changes and item sync failed actions', () => {
    const expectedActions = [
      'saveItemChanges',
      'itemSyncFailed',
    ];
    const httpClient = httpClientFailure;
    const saveItemChanges = jest.fn(() => expectedActions[0]);
    const itemSyncFailed = jest.fn(() => expectedActions[1]);
    const saveNewText = saveNewTextFactory({
      httpClient,
      saveItemChanges,
      itemSyncFailed,
      itemSyncSucceeded: fakeFunction,
    });

    const dispatchableAction = saveNewText(actionParams);

    return assertThatDispatchWasCalledWithArgumentsInGiveOrder(dispatchableAction, expectedActions);
  });
});
