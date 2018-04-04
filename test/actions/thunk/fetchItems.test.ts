import { ListItem } from '../../../src/models/classes/ListItem';
import { fetchItemsFactory } from '../../../src/actions/thunk/fetchItemsFactory';
import {
  httpClientSuccessFactory,
  httpClientFailure,
  getDispatchedActionTypes,
} from './thunkTestsUtils';
import {
  ITEMS_FETCH_FAILED,
  ITEMS_FETCH_SUCCESS,
  ITEMS_FETCH_START,
} from '../../../src/constants/actionTypes';

const uri = '';

describe('fetchItems will call dispatch with', () => {
  it('startFetchingItems and receiveFetchedItems actions', () => {
    const expectedActionTypes = [
      ITEMS_FETCH_START,
      ITEMS_FETCH_SUCCESS,
    ];

    const items = [
      new ListItem(),
    ];
    const httpClient = httpClientSuccessFactory(items);
    const fetchItems = fetchItemsFactory({
      uri,
      httpClient,
    });
    const dispatch = jest.fn();

    return fetchItems()(dispatch)
      .then(() => {
        const callArguments = getDispatchedActionTypes(dispatch);

        expect(callArguments)
          .toEqual(expectedActionTypes);
      });
  });

  it('startFetchingItems and notifyFailedItemsFetching actions', () => {
    const expectedActionTypes = [
      ITEMS_FETCH_START,
      ITEMS_FETCH_FAILED,
    ];
    const httpClient = httpClientFailure;
    const fetchItems = fetchItemsFactory({
      uri,
      httpClient,
    });
    const dispatch = jest.fn();

    return fetchItems()(dispatch)
      .then(() => {
        const callArguments = getDispatchedActionTypes(dispatch);

        expect(callArguments)
          .toEqual(expectedActionTypes);
      });
  });
});
