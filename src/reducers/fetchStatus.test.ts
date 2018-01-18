import { fetchStatus } from './fetchStatus';
import { FetchStatus } from '../models/FetchStatus';
import { setFetchError, setFetchSuccess } from '../actions/actionCreators';

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
    const errorAction = setFetchError(errorMessage);
    const expectedState = new FetchStatus({
      isFetching: false,
      hasError: true,
      errorMessage
    });

    const newState = fetchStatus(expectedState, errorAction);

    expect(newState).toEqual(expectedState);
  });

  it('sets flags correctly on successful', () => {
    const successfulAction = setFetchSuccess();
    const expectedState = new FetchStatus({
      isFetching: false,
      hasError: false,
    });

    const newState = fetchStatus(expectedState, successfulAction);

    expect(newState).toEqual(expectedState);
  });
});
