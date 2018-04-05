import { FetchItemsState } from '../../../../src/models/enums/FetchItemsState';
import {
  notifyFailedItemsFetching,
  receiveFetchedItems,
  startFetchingItems,
} from '../../../../src/actions/thunk/fetchItemsFactory';
import deepFreeze = require('deep-freeze');
import { fetchItemsState } from '../../../../src/reducers/list/fetchItemsState';
import { IAction } from '../../../../src/models/interfaces/IAction';

describe('fetchItemsState', () => {
  describe('startFetchingItems', () => {
    [FetchItemsState.INITIAL, FetchItemsState.FAILED]
      .forEach(initialState =>
        it('will set fetch items state to Requested', () => {
          deepFreeze(initialState);

          const expectedState = FetchItemsState.REQUESTED;

          const action = startFetchingItems();
          const result = fetchItemsState(initialState, action);

          expect(result)
            .toBe(expectedState);
        }));
  });

  describe('receiveFetchedItems', () => {
    it('will set fetch items state to Received', () => {
      const initialState = FetchItemsState.REQUESTED;
      deepFreeze(initialState);

      const expectedState = FetchItemsState.RECEIVED;

      const action = receiveFetchedItems([]);
      const result = fetchItemsState(initialState, action);

      expect(result)
        .toBe(expectedState);
    });
  });

  describe('notifyFailedItemsFetching', () => {
    it('will set fetch items state to Failed', () => {
      const initialState = FetchItemsState.REQUESTED;
      deepFreeze(initialState);

      const expectedState = FetchItemsState.FAILED;

      const action = notifyFailedItemsFetching();
      const result = fetchItemsState(initialState, action);

      expect(result)
        .toBe(expectedState);
    });

    it('will change fetch items state to Failed from undefined', () => {
      const initialState = undefined;
      const expectedState = FetchItemsState.FAILED;

      const action = notifyFailedItemsFetching();
      const result = fetchItemsState(initialState, action);

      expect(result)
        .toBe(expectedState);
    });
  });

  describe('undefined action', () => {
    it('will not modify fetch items state', () => {
      const initialState = FetchItemsState.RECEIVED;
      deepFreeze(initialState);
      const expectedState = initialState;

      const action: IAction = {
        payload: undefined,
        type: 'test_typpe',
      };
      const result = fetchItemsState(initialState, action);

      expect(result)
        .toBe(expectedState);
    });

    it('will set state to Initial if undefined', () => {
      const initialState = undefined;
      const expectedState = FetchItemsState.INITIAL;

      const action: IAction = {
        payload: undefined,
        type: 'test_typpe',
      };
      const result = fetchItemsState(initialState, action);

      expect(result)
        .toBe(expectedState);
    });
  });
});
