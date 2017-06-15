import { ITEM_SAVE_SUCCEED } from '../../src/actions/actionTypes';
import { postItemFactory } from '../../src/actions/postItemFactory';
import { positivelyCreateItemLocally } from '../../src/actions/actionCreators';
import { Item } from '../../src/models/Item.ts';
import {
  API_VERSION_1,
  ITEMS
} from '../../src/constants/urls';

describe('post Item Factory', () => {
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
  const generateId = () => ueid;
  const receivePostItemErrorMock = jest.fn((error, ueid) => ({ error, ueid }));
  const receiveItemCreatedMock = json => ({
    type: ITEM_SAVE_SUCCEED,
    payload: {
      item: json,
    }
  });

  it('postItem calls fetch with correct arguments', () => {
    const fetch = jest.fn(() => Promise.resolve(getItem));
    const dispatch = (action) => action;
    const parseResponseMock = (errorMessage) => (response) => new Promise();

    const postItem = postItemFactory({
      positivelyCreateItemLocally,
      fetch: fetch,
      generateId: generateId,
      receivePostItemError: receivePostItemErrorMock,
      receiveItemCreated: receiveItemCreatedMock,
      parseResponse: parseResponseMock
    });

    return postItem(value)(dispatch).then(() => {
      expect(fetch.mock.calls[0][0]).toEqual(API_VERSION_1 + ITEMS);
      expect(fetch.mock.calls[0][1]).toEqual({
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ueid: item.ueid, value: item.value })
      });
    });
  });

  it('postItem correctly creates item with given value and passes it to dispatch in first call', () => {
    const fetch = () => Promise.resolve(getItem);
    const dispatch = jest.fn(action => action);
    const parseResponseMock = (errorMessage) => (response) => new Promise();
    const postItem = postItemFactory({
      positivelyCreateItemLocally,
      fetch,
      generateId,
      receivePostItemError: receivePostItemErrorMock,
      receiveItemCreated: receiveItemCreatedMock,
      parseResponse: parseResponseMock
    });

    return postItem(value)(dispatch).then(() => {
      expect(dispatch.mock.calls[0][0].payload.value).toEqual(value);
      expect(dispatch.mock.calls[0][0].payload.ueid).toEqual(ueid);
    });
  });

  it('postItem correctly calls action with given item as a second call in dispatch', () => {
    const fetch = () => Promise.resolve(item);
    const dispatch = jest.fn(action => action);

    const postItem = postItemFactory({
      positivelyCreateItemLocally,
      fetch,
      generateId,
      receivePostItemError: receivePostItemErrorMock,
      receiveItemCreated: receiveItemCreatedMock,
      parseResponse: identityFunc
    });

    return postItem(value)(dispatch).then(() => {
      expect(dispatch.mock.calls[1][0].payload.item).toEqual(item);
    });
  });
});
