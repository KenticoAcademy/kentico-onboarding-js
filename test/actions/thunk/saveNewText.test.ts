import { saveNewTextFactory } from '../../../src/actions/thunk/saveNewTextFactory';
import {
  assertThatDispatchWasCalledWithArgumentsInGiveOrder,
  fakeFunction,
  httpClientFailure,
  httpClientSuccessFactory,
} from './utils/utils';
import { defaultUuid } from '../../../src/constants/defaultUuid';

const actionParams = {
  id: defaultUuid,
  text: '',
};
const uri = '';

describe('saveNewText will call dispatch with', () => {
  it('saveItemChanges and itemSyncSucceeded actions', () => {
    const expectedActions = [
      'saveItemChanges',
      'itemSyncSucceeded',
    ];
    const httpClient = httpClientSuccessFactory();
    const saveItemChanges = jest.fn(() => expectedActions[0]);
    const itemSyncSucceeded = jest.fn(() => expectedActions[1]);
    const saveNewText = saveNewTextFactory({
      uri,
      httpClient,
      saveItemChanges,
      itemSyncSucceeded,
      itemSyncFailed: fakeFunction,
    });

    const dispatchableAction = saveNewText(actionParams);

    return assertThatDispatchWasCalledWithArgumentsInGiveOrder(dispatchableAction, expectedActions);
  });

  it('saveItemChanges, itemSyncRequested and itemSyncFailed actions', () => {
    const expectedActions = [
      'saveItemChanges',
      'itemSyncFailed',
    ];
    const httpClient = httpClientFailure;
    const saveItemChanges = jest.fn(() => expectedActions[0]);
    const itemSyncFailed = jest.fn(() => expectedActions[1]);
    const saveNewText = saveNewTextFactory({
      uri,
      httpClient,
      saveItemChanges,
      itemSyncFailed,
      itemSyncSucceeded: fakeFunction,
    });

    const dispatchableAction = saveNewText(actionParams);

    return assertThatDispatchWasCalledWithArgumentsInGiveOrder(dispatchableAction, expectedActions);
  });
});
