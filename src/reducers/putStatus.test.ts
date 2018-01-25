import {
  setCallError,
  setCallSuccess
} from '../actions/actionCreators';
import { PutStatus } from '../models/PutStatus';
import { putStatus } from './putStatus';
import { ITEM_PUT_ERROR, ITEM_PUT_SUCCESS } from '../constants/actionTypes';

describe('putStatus reducer', () => {
  const UNKNOWN_ACTION = 'UNKNOWN_ACTION';
  const unknownAction = {
    type: UNKNOWN_ACTION,
    payload: {},
  };

  it('creates initial state correctly', () => {
    const defaultStatus = new PutStatus();

    const initialState = putStatus(undefined, unknownAction);

    expect(initialState).toEqual(defaultStatus);
  });

  it('sets flags correctly on failed request with errorMessage', () => {
    const errorMessage = '400 Bad Request';
    const errorAction = setCallError(ITEM_PUT_ERROR, errorMessage);
    const expectedState = new PutStatus({
      hasError: true,
      errorMessage
    });

    const newState = putStatus(expectedState, errorAction);

    expect(newState).toEqual(expectedState);
  });

  it('sets flags correctly on successful request', () => {
    const successfulAction = setCallSuccess(ITEM_PUT_SUCCESS);
    const expectedState = new PutStatus({
      hasError: false,
    });

    const newState = putStatus(expectedState, successfulAction);

    expect(newState).toEqual(expectedState);
  });
});
