import { PostStatus } from '../models/PostStatus';
import { postStatus } from './postStatus';
import { postError, postSuccess } from '../actions/actionCreators';

describe('postStatus reducer', () => {
  const UNKNOWN_ACTION = 'UNKNOWN_ACTION';
  const unknownAction = {
    type: UNKNOWN_ACTION,
    payload: {},
  };

  it('creates initial state correctly', () => {
    const defaultStatus = new PostStatus();

    const initialState = postStatus(undefined, unknownAction);

    expect(initialState).toEqual(defaultStatus);
  });

  it('sets flags correctly on failed request with errorMessage', () => {
    const errorMessage = '400 Bad Request';
    const errorAction = postError(errorMessage);
    const expectedState = new PostStatus({
      hasError: true,
      errorMessage
    });

    const newState = postStatus(expectedState, errorAction);

    expect(newState).toEqual(expectedState);
  });

  it('sets flags correctly on successful request', () => {
    const successfulAction = postSuccess({
      newId: '123',
      id: '234',
      text: 'bla',
      isSynchronized: true
    });
    const stateWithError = new PostStatus({
      hasError: true,
    });
    const expectedState = new PostStatus({
      hasError: false,
    });

    const newState = postStatus(stateWithError, successfulAction);

    expect(newState).toEqual(expectedState);
  });
});
