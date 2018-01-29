import {
  apiCallError,
  apiCallSuccess
} from '../actions/actionCreators';
import { DeleteStatus } from '../models/DeleteStatus';
import { deleteStatus } from './deleteStatus';
import { ITEM_DELETE_ERROR, ITEM_DELETE_SUCCESS } from '../constants/actionTypes';

describe('deleteStatus reducer', () => {
  const UNKNOWN_ACTION = 'UNKNOWN_ACTION';
  const unknownAction = {
    type: UNKNOWN_ACTION,
    payload: {},
  };

  it('creates initial state correctly', () => {
    const defaultStatus = new DeleteStatus();

    const initialState = deleteStatus(undefined, unknownAction);

    expect(initialState).toEqual(defaultStatus);
  });

  it('sets flags correctly on failed request with errorMessage', () => {
    const errorMessage = '400 Bad Request';
    const errorAction = apiCallError(ITEM_DELETE_ERROR, errorMessage);
    const expectedState = new DeleteStatus({
      hasError: true,
      errorMessage
    });

    const newState = deleteStatus(expectedState, errorAction);

    expect(newState).toEqual(expectedState);
  });

  it('sets flags correctly on successful request', () => {
    const successfulAction = apiCallSuccess(ITEM_DELETE_SUCCESS);
    const expectedState = new DeleteStatus({
      hasError: false,
    });

    const newState = deleteStatus(expectedState, successfulAction);

    expect(newState).toEqual(expectedState);
  });
});
