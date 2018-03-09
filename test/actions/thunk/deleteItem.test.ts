import { deleteItemFactory } from '../../../src/actions/thunk/deleteItemFactory';
import {
  dispatch,
  fakeFunction,
  getFirstArgumentOfCalls,
  httpClientFailure,
  httpClientSuccessFactory,
} from './thunkTestsUtils';

const actionParams = {
  id: '',
};
const uri = '';

describe('deleteItem will call dispatch with', () => {
  it('deleteItemRequest and deleteItemConfirm actions', () => {
    const expectedActions = [
      'deleteItemRequest',
      'deleteItemConfirm',
    ];
    const httpClient = httpClientSuccessFactory();
    const deleteItemRequest = jest.fn(() => expectedActions[0]);
    const deleteItemConfirm = jest.fn(() => expectedActions[1]);
    const deleteItem = deleteItemFactory({
      uri,
      httpClient,
      deleteItemRequest,
      deleteItemConfirm,
      deleteItemFailed: fakeFunction,
    });

    return deleteItem(actionParams)(dispatch)
      .then(() => {
        const callArguments = getFirstArgumentOfCalls(dispatch);

        expect(callArguments)
          .toEqual(expectedActions);
      })
      .catch(fakeFunction);
  });

  it('deleteItemRequest and deleteItemFailed actions', () => {
    const expectedActions = [
      'deleteItemRequest',
      'deleteItemFailed',
    ];
    const httpClient = httpClientFailure;
    const deleteItemRequest = jest.fn(() => expectedActions[0]);
    const deleteItemFailed = jest.fn(() => expectedActions[1]);
    const deleteItem = deleteItemFactory({
      uri,
      httpClient,
      deleteItemFailed,
      deleteItemRequest,
      deleteItemConfirm: fakeFunction,
    });

    return deleteItem(actionParams)(dispatch)
      .then(() => {
        const callArguments = getFirstArgumentOfCalls(dispatch);

        expect(callArguments)
          .toEqual(expectedActions);
      })
      .catch(fakeFunction);
  });
});
