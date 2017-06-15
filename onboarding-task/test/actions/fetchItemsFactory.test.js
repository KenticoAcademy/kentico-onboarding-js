import {
  ITEMS_FETCHING_STARTED,
  ITEMS_FETCHING_SUCCEED,
} from '../../src/actions/actionTypes';
import { requestItems } from '../../src/actions/actionCreators';
import { fetchItemsFactory } from '../../src/actions/fetchItemsFactory';
import { Item } from '../../src/models/Item.ts';
import { API_VERSION_1, ITEMS } from '../../src/constants/urls';

describe('actionCreators', () => {
  const id = 'da5cbf5f-2d20-4945-b8d2-4cc3b6be1542';
  const ueid = '2235d270-3918-48d9-95f7-a1b0ef008126';
  const value = 'value';
  const item = new Item({
    id,
    ueid,
    value
  });
  const getItem = { json: () => item };
  const identityFunc = jest.fn(id => id);

  it('fetchItems calls fetch with correct arguments', () => {
    const fetch = jest.fn(() => Promise.resolve(getItem));
    const dispatch = action => action;
    const fetchItem = fetchItemsFactory({
      requestItems: identityFunc,
      fetch,
      receiveItems: identityFunc,
      parseResponse: identityFunc,
      receiveItemsFetchingError: identityFunc
    });

    return fetchItem(dispatch).then(() => {
      expect(fetch.mock.calls[0][0]).toEqual(API_VERSION_1 + ITEMS)
    });
  });

  it('fetchItems correctly dispatches requestItems', () => {
    const fetch = () => Promise.resolve(getItem);
    const dispatch = jest.fn(action => action);
    const fetchItem = fetchItemsFactory({
      requestItems,
      fetch,
      receiveItems: identityFunc,
      parseResponse: identityFunc,
      receiveItemsFetchingError: identityFunc
    });

    return fetchItem(dispatch).then(() => {
      expect(dispatch.mock.calls[0][0].type).toEqual(ITEMS_FETCHING_STARTED);
    });
  });

  it('fetchItems dispatches receiveItems with correct argument', () => {
    const fetch = () => ({
      response: { ok: true },
      then: () => Promise.resolve(item),
    });
    const receiveItems = items => ({ type: ITEMS_FETCHING_SUCCEED, payload: { items: items } });
    const dispatch = jest.fn(action => action);

    const fetchItem = fetchItemsFactory({
      requestItems,
      fetch,
      parseResponse: identityFunc,
      receiveItems: receiveItems,
      receiveItemsFetchingError: identityFunc
    });

    return fetchItem(dispatch).then(() => {
      expect(dispatch.mock.calls[1][0].type).toEqual(ITEMS_FETCHING_SUCCEED);
      expect(dispatch.mock.calls[1][0].payload.items).toEqual(item);
    });
  });
});
