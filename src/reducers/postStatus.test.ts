import {
  setPostError,
  setPostSuccess
} from '../actions/actionCreators';
import { PostStatus } from '../models/PostStatus';
import { postStatus } from './postStatus';

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
    const errorAction = setPostError(errorMessage);
    const expectedState = new PostStatus({
      hasError: true,
      errorMessage
    });

    const newState = postStatus(expectedState, errorAction);

    expect(newState).toEqual(expectedState);
  });

  it('sets flags correctly on successful request', () => {
    const successfulAction = setPostSuccess();
    const expectedState = new PostStatus({
      hasError: false,
    });

    const newState = postStatus(expectedState, successfulAction);

    expect(newState).toEqual(expectedState);
  });
});
