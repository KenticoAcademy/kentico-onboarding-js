import {
  setCallError,
  setCallSuccess
} from '../actions/actionCreators';
import { PostStatus } from '../models/PostStatus';
import { postStatus } from './postStatus';
import { ITEM_POST_ERROR, ITEM_POST_SUCCESS } from '../constants/actionTypes';

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
    const errorAction = setCallError(ITEM_POST_ERROR, errorMessage);
    console.log(errorAction);
    const expectedState = new PostStatus({
      hasError: true,
      errorMessage
    });

    const newState = postStatus(expectedState, errorAction);

    expect(newState).toEqual(expectedState);
  });

  it('sets flags correctly on successful request', () => {
    const successfulAction = setCallSuccess(ITEM_POST_SUCCESS);
    const expectedState = new PostStatus({
      hasError: false,
    });

    const newState = postStatus(expectedState, successfulAction);

    expect(newState).toEqual(expectedState);
  });
});
