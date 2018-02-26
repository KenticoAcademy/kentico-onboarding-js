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
  it('saveItemChangesRequest and saveItemChangesConfirm actions', () => {
    const expectedActions = [
      'saveItemChangesRequest',
      'saveItemChangesConfirm',
    ];
    const httpClient = httpClientSuccessFactory();
    const saveItemChangesRequest = jest.fn(() => expectedActions[0]);
    const saveItemChangesConfirm = jest.fn(() => expectedActions[1]);
    const saveNewText = saveNewTextFactory({
      uri,
      httpClient,
      saveItemChangesRequest,
      saveItemChangesConfirm,
      itemSyncFailed: fakeFunction,
    });

    const dispatchableAction = saveNewText(actionParams);

    return assertThatDispatchWasCalledWithArgumentsInGiveOrder(dispatchableAction, expectedActions);
  });

  it('saveItemChangesRequest and itemSyncFailed actions', () => {
    const expectedActions = [
      'saveItemChangesRequest',
      'itemSyncFailed',
    ];
    const httpClient = httpClientFailure;
    const saveItemChangesRequest = jest.fn(() => expectedActions[0]);
    const itemSyncFailed = jest.fn(() => expectedActions[1]);
    const saveNewText = saveNewTextFactory({
      uri,
      httpClient,
      saveItemChangesRequest,
      itemSyncFailed,
      saveItemChangesConfirm: fakeFunction,
    });

    const dispatchableAction = saveNewText(actionParams);

    return assertThatDispatchWasCalledWithArgumentsInGiveOrder(dispatchableAction, expectedActions);
  });
});
