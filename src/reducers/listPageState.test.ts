import { listPageState } from './listPageState';
import { ListPageState } from '../enums/listPageState';

describe('listPageState reducer', () => {
  it('should return ListPageState.Loading for undefined state', () => {
    const action = {
      type: 'unknown'
    };
    const expectedState = ListPageState.Loading;

    const initialState = listPageState(undefined, action);

    expect(initialState).toEqual(expectedState);
  });

  it('should return previous state for unknown action', () => {
    const action = {
      type: 'unknown'
    };
    const previousState = ListPageState.LoadFailed;

    const newState = listPageState(previousState, action);

    expect(newState).toEqual(previousState);
  });

  it('should set state to ListPageState.Loading on ITEMS_FETCH_STARTED', () => {
    const action = {
      type: 'ITEMS_FETCH_STARTED'
    };
    const previousState = ListPageState.LoadFailed;
    const expectedState = ListPageState.Loading;

    const newState = listPageState(previousState, action);

    expect(newState).toEqual(expectedState);
  });

  it('should set state to ListPageState.LoadFailed on ITEMS_FETCH_FAILED', () => {
    const action = {
      type: 'ITEMS_FETCH_FAILED'
    };
    const previousState = ListPageState.Loading;
    const expectedState = ListPageState.LoadFailed;

    const newState = listPageState(previousState, action);

    expect(newState).toEqual(expectedState);
  });

  it('should set state to ListPageState.Loaded on ITEMS_FETCH_SUCCEEDED', () => {
    const action = {
      type: 'ITEMS_FETCH_SUCCEEDED'
    };
    const previousState = ListPageState.Loading;
    const expectedState = ListPageState.Loaded;

    const newState = listPageState(previousState, action);

    expect(newState).toEqual(expectedState);
  });
});
