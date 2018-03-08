import { editItemFactory } from '../../../src/actions/thunk/editItemFactory';
import {
  assertThatDispatchWasCalledWithArgumentsInGiveOrder,
  fakeFunction,
  httpClientFailure,
  httpClientSuccessFactory,
} from './thunkTestsUtils';
import { defaultUuid } from '../../../src/constants/defaultUuid';

const actionParams = {
  id: defaultUuid,
  text: '',
};
const uri = '';

describe('editItemAsync will call dispatch with', () => {
  it('saveItemChangesRequest and saveItemChangesConfirm actions', () => {
    const expectedActions = [
      'saveItemChangesRequest',
      'saveItemChangesConfirm',
    ];
    const httpClient = httpClientSuccessFactory();
    const saveItemChangesRequest = jest.fn(() => expectedActions[0]);
    const saveItemChangesConfirm = jest.fn(() => expectedActions[1]);
    const saveNewText = editItemFactory({
      uri,
      httpClient,
      saveItemChangesRequest,
      saveItemChangesConfirm,
      saveItemChangesFailed: fakeFunction,
    });

    const dispatchableAction = saveNewText(actionParams);

    return assertThatDispatchWasCalledWithArgumentsInGiveOrder(dispatchableAction, expectedActions);
  });

  it('saveItemChangesRequest and saveItemChangesFailed actions', () => {
    const expectedActions = [
      'saveItemChangesRequest',
      'saveItemChangesFailed',
    ];
    const httpClient = httpClientFailure;
    const saveItemChangesRequest = jest.fn(() => expectedActions[0]);
    const saveItemChangesFailed = jest.fn(() => expectedActions[1]);
    const saveNewText = editItemFactory({
      uri,
      httpClient,
      saveItemChangesRequest,
      saveItemChangesFailed,
      saveItemChangesConfirm: fakeFunction,
    });

    const dispatchableAction = saveNewText(actionParams);

    return assertThatDispatchWasCalledWithArgumentsInGiveOrder(dispatchableAction, expectedActions);
  });
});
