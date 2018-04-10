/*
import { PostStatus } from '../models/PostStatus';
import { postStatus } from './postStatus';
import { closePostError } from '../actions/actionCreators';
import { postFailed, postSucceeded } from '../actions/actionCreatorsFactories/postItemFactory';

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
    const message = '400 Bad Request';
    const id = 'ccda6054-f30d-4ee9-98b9-f6351ef9794c';
    const errorAction = postFailed(id, message);
    const expectedState = new PostStatus({
      hasError: true,
      message
    });

    const newState = postStatus(expectedState, errorAction);

    expect(newState).toEqual(expectedState);
  });

  it('sets flags correctly on successful request', () => {
    const successfulAction = postSucceeded(
      '123',
      {
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

  it('sets flag correctly on error message close', () => {
    const stateWithError = new PostStatus({
      hasError: true
    });
    const expectedState = new PostStatus({
      hasError: false
    });

    const newState = postStatus(stateWithError, closePostError());

    expect(newState).toEqual(expectedState);
  });
});
*/
