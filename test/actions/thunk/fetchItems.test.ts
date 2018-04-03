import { ListItem } from '../../../src/models/classes/ListItem';
import { fetchItemsFactory } from '../../../src/actions/thunk/fetchItemsFactory';
import {
  httpClientSuccessFactory,
  httpClientFailure,
  getDispatchedActionTypes,
} from './thunkTestsUtils';
import {
  FETCH_FAILED,
  RECEIVE_ITEMS,
  REQUEST_ITEMS,
} from '../../../src/constants/actionTypes';

const uri = '';

describe('fetchItems will call dispatch with', () => {
  it('requestItems and receiveItems actions', () => {
    const expectedActionTypes = [
      REQUEST_ITEMS,
      RECEIVE_ITEMS,
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

  it('requestItems and fetchFailed actions', () => {
    const expectedActionTypes = [
      REQUEST_ITEMS,
      FETCH_FAILED,
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
