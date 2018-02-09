import { fetchStatus } from './fetchStatus';
import { FetchStatus } from '../models/FetchStatus';
import { apiCallSuccess } from '../actions/index';
import { ITEMS_FETCH_ERROR, ITEMS_FETCH_SUCCESS } from '../constants/actionTypes';
import { fetchError } from '../actions/actionCreators';

describe('fetchStatus reducer', () => {
  const UNKNOWN_ACTION = 'UNKNOWN_ACTION';
  const unknownAction = {
    type: UNKNOWN_ACTION,
    payload: {},
  };

  it('creates initial state correctly', () => {
    const defaultStatus = new FetchStatus();

    const initialState = fetchStatus(undefined, unknownAction);

    expect(initialState).toEqual(defaultStatus);
  });

  it('sets flags correctly on failed request with errorMessage', () => {
    const errorMessage = '400 Bad Request';
    const errorAction = fetchError(ITEMS_FETCH_ERROR, errorMessage);
    const expectedState = new FetchStatus({
      isFetching: false,
      hasError: true,
      errorMessage
    });

    const newState = fetchStatus(expectedState, errorAction);

    expect(newState).toEqual(expectedState);
  });

  it('sets flags correctly on successful', () => {
    const successfulAction = apiCallSuccess(ITEMS_FETCH_SUCCESS);
    const expectedState = new FetchStatus({
      isFetching: false,
      hasError: false,
    });

    const newState = fetchStatus(expectedState, successfulAction);

    expect(newState).toEqual(expectedState);
  });
});
