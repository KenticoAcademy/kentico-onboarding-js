import { fetchStatus } from './fetchStatus';
import { FetchStatus } from '../../models/FetchStatus';
import {
  closeFetchError,
} from '../../actions/actionCreators';
import {
  ITEMS_FETCH_FAILED,
  ITEMS_FETCH_SUCCEEDED
} from '../../constants/actionTypes';

describe('fetchStatus reducer', () => {
  const UNKNOWN_ACTION = 'UNKNOWN_ACTION';
  const unknownAction = {
    type: UNKNOWN_ACTION,
    payload: {},
  };

  it('should return default fetch status when state is undefined ', () => {
    const defaultStatus = new FetchStatus();

    const initialState = fetchStatus(undefined, unknownAction);

    expect(initialState).toEqual(defaultStatus);
  });

  it('returns previous state on unknown action', () => {
    const errorMessage = '400 Bad Request';
    const expectedState = new FetchStatus({
      isFetching: false,
      hasError: true,
      errorMessage
    });

    const newState = fetchStatus(expectedState, unknownAction);

    expect(newState).toEqual(expectedState);
  });

  it('sets flags correctly on failed request with errorMessage', () => {
    const errorMessage = '400 Bad Request';
    const errorAction = {
      type: ITEMS_FETCH_FAILED,
      payload: {
        errorText: errorMessage
      }
    };
    const expectedState = new FetchStatus({
      isFetching: false,
      hasError: true,
      errorMessage
    });

    const newState = fetchStatus(expectedState, errorAction);

    expect(newState).toEqual(expectedState);
  });

  it('sets flags correctly on successful', () => {
    const successfulAction = {
      type: ITEMS_FETCH_SUCCEEDED,
    };
    const expectedState = new FetchStatus({
      isFetching: false,
      hasError: false,
    });

    const newState = fetchStatus(expectedState, successfulAction);

    expect(newState).toEqual(expectedState);
  });

  it('sets flag correctly on error message close', () => {
    const stateWithError = new FetchStatus({
      hasError: true
    });
    const expectedState = new FetchStatus({
      hasError: false,
      isFetching: false,
    });

    const newState = fetchStatus(stateWithError, closeFetchError());

    expect(newState).toEqual(expectedState);
  });
});
