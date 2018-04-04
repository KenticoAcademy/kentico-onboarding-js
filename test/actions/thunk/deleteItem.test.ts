import { deleteItemFactory } from '../../../src/actions/thunk/deleteItemFactory';
import {
  getDispatchedActionTypes,
  httpClientFailure,
  httpClientSuccessFactory,
} from './thunkTestsUtils';
import {
  ITEM_DELETE_SUCCESS,
  ITEM_DELETE_START,
  ITEM_SYNC_FAILED,
} from '../../../src/constants/actionTypes';

const actionParams = {
  id: '',
};
const uri = '';

describe('deleteItem will call dispatch with', () => {
  it('requestItemDeletion and confirmItemDeletion actions', () => {
    const expectedActionTypes = [
      ITEM_DELETE_START,
      ITEM_DELETE_SUCCESS,
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

  it('requestItemDeletion and deleteItemFailed actions', () => {
    const expectedActionTypes = [
      ITEM_DELETE_START,
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
