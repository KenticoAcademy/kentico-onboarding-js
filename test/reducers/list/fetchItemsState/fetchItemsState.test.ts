import { FetchItemsState } from '../../../../src/models/enums/FetchItemsState';
import {
  fetchFailed,
  receiveItems,
  requestItems
} from '../../../../src/actions';
import deepFreeze = require('deep-freeze');
import { fetchItemsState } from '../../../../src/reducers/list/fetchItemsState/fetchItemsState';

describe('fetchItemsState', () => {
  it('will change fetch items state to Requested', () => {
    const initialState = FetchItemsState.INITIAL;
    deepFreeze(initialState);

    const expectedState = FetchItemsState.REQUESTED;

    const action = requestItems('');
    const result = fetchItemsState(initialState, action);

    expect(result)
      .toBe(expectedState);
  });

  it('will change fetch items state to Received', () => {
    const initialState = FetchItemsState.REQUESTED;
    deepFreeze(initialState);

    const expectedState = FetchItemsState.RECEIVED;

    const action = receiveItems([]);
    const result = fetchItemsState(initialState, action);

    expect(result)
      .toBe(expectedState);
  });

  it('will change fetch items state to Failed', () => {
    const initialState = FetchItemsState.REQUESTED;
    deepFreeze(initialState);

    const expectedState = FetchItemsState.FAILED;

    const action = fetchFailed();
    const result = fetchItemsState(initialState, action);

    expect(result)
      .toBe(expectedState);
  });

  it('will change fetch items state to Failed', () => {
    const initialState = FetchItemsState.FAILED;
    deepFreeze(initialState);

    const expectedState = FetchItemsState.REQUESTED;

    const action = requestItems('');
    const result = fetchItemsState(initialState, action);

    expect(result)
      .toBe(expectedState);
  });
});
