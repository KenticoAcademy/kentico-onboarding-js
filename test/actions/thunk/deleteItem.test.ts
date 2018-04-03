import { deleteItemFactory } from '../../../src/actions/thunk/deleteItemFactory';
import {
  getDispatchedActionTypes,
  httpClientFailure,
  httpClientSuccessFactory,
} from './thunkTestsUtils';
import {
  DELETE_ITEM_CONFIRM,
  DELETE_ITEM_REQUEST,
  ITEM_SYNC_FAILED,
} from '../../../src/constants/actionTypes';

const actionParams = {
  id: '',
};
const uri = '';

describe('deleteItem will call dispatch with', () => {
  it('deleteItemRequest and deleteItemConfirm actions', () => {
    const expectedActionTypes = [
      DELETE_ITEM_REQUEST,
      DELETE_ITEM_CONFIRM,
    ];
    const httpClient = httpClientSuccessFactory();
    const deleteItem = deleteItemFactory({
      uri,
      httpClient,
    });
    const dispatch = jest.fn();

    return deleteItem(actionParams)(dispatch)
      .then(() => {
        const callArguments = getDispatchedActionTypes(dispatch);

        expect(callArguments)
          .toEqual(expectedActionTypes);
      });
  });

  it('deleteItemRequest and deleteItemFailed actions', () => {
    const expectedActionTypes = [
      DELETE_ITEM_REQUEST,
      ITEM_SYNC_FAILED,
    ];
    const httpClient = httpClientFailure;
    const deleteItem = deleteItemFactory({
      uri,
      httpClient,
    });
    const dispatch = jest.fn();

    return deleteItem(actionParams)(dispatch)
      .then(() => {
        const callArguments = getDispatchedActionTypes(dispatch);

        expect(callArguments)
          .toEqual(expectedActionTypes);
      });
  });
});
