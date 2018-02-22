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
  it('saveItemChanges, itemSyncRequested and itemSyncSucceeded actions', () => {
    const expectedActions = [
      'saveItemChanges',
      'itemSyncRequested',
      'itemSyncSucceeded',
    ];
    const httpClient = httpClientSuccessFactory();
    const saveItemChanges = jest.fn(() => expectedActions[0]);
    const itemSyncRequested = jest.fn(() => expectedActions[1]);
    const itemSyncSucceeded = jest.fn(() => expectedActions[2]);
    const saveNewText = saveNewTextFactory({
      uri,
      httpClient,
      saveItemChanges,
      itemSyncSucceeded,
      itemSyncRequested,
      itemSyncFailed: fakeFunction,
    });

    const dispatchableAction = saveNewText(actionParams);

    return assertThatDispatchWasCalledWithArgumentsInGiveOrder(dispatchableAction, expectedActions);
  });

  it('saveItemChanges, itemSyncRequested and itemSyncFailed actions', () => {
    const expectedActions = [
      'saveItemChanges',
      'itemSyncRequested',
      'itemSyncFailed',
    ];
    const httpClient = httpClientFailure;
    const saveItemChanges = jest.fn(() => expectedActions[0]);
    const itemSyncRequested = jest.fn(() => expectedActions[1]);
    const itemSyncFailed = jest.fn(() => expectedActions[2]);
    const saveNewText = saveNewTextFactory({
      uri,
      httpClient,
      saveItemChanges,
      itemSyncFailed,
      itemSyncRequested,
      itemSyncSucceeded: fakeFunction,
    });

    const dispatchableAction = saveNewText(actionParams);

    return assertThatDispatchWasCalledWithArgumentsInGiveOrder(dispatchableAction, expectedActions);
  });
});
