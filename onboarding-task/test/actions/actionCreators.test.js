import {
  editItem,
  toggleItemViewMode,
  deleteItem,
  positivelyCreateItemLocally,
} from '../../src/actions/actionCreators';
import {
  POSITIVELY_CREATE_ITEM_LOCALLY,
  DELETE_ITEM,
  EDIT_ITEM,
  TOGGLE_ITEM_VIEW_MODE,
  ITEMS_FETCHING_STARTED,
  ITEMS_FETCHING_SUCCEED,
  ITEMS_FETCHING_FAILED,
  ITEM_SAVE_FAILED,
  ITEM_SAVE_SUCCEED,
} from '../../src/actions/actionTypes';
import { postItemFactory } from '../../src/actions/postItemFactory';
import { fetchItemsFactory } from '../../src/actions/fetchItemsFactory';
import { receiveItemsFetchingErrorFactory } from '../../src/actions/receiveItemsFetchingErrorFactory';
import { receivePostItemErrorFactory } from '../../src/actions/receivePostItemErrorFactory';
import { Item } from '../../src/models/Item.ts';
import { ErrorMessage } from '../../src/models/ErrorMessage';
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

  // Set up for postItemFactory tests
  const receivePostItemErrorAction = (error, itemUeid) => ({
    type: ITEM_SAVE_FAILED,
    payload: {
      id: id,
      itemUeid,
      message: error.message,
    },
  });
  // const receivePostItemErrorMock = (error, itemUeid) => receivePostItemErrorAction(error, itemUeid);
  const receivePostItemErrorMock = jest.fn((error, ueid) => receivePostItemErrorAction(error, ueid));
  const receiveItemCreatedMock = json => ({
    type: ITEM_SAVE_SUCCEED,
    payload: {
      item: json,
    }
  });
  const parseResponseMock = (errorMessage) => (response) => new Promise();

  it('deleteItem creates correct action', () => {
    const expectedAction = {
      type: DELETE_ITEM,
      payload: { id },
    };

    const actualAction = deleteItem(id);

    expect(actualAction).toEqual(expectedAction);
  });

  it('positivelyCreateItemLocally creates correct action', () => {
    const expectedAction = {
      type: POSITIVELY_CREATE_ITEM_LOCALLY,
      payload: { ueid, value },
    };

    const actualAction = positivelyCreateItemLocally(item);

    expect(actualAction).toEqual(expectedAction);
  });

  it('editItem creates correct action', () => {
    const expectedAction = {
      type: EDIT_ITEM,
      payload: { id, value },
    };

    const actualAction = editItem(id, value);

    expect(actualAction).toEqual(expectedAction);
  });

  it('toggleItemViewMode creates correct action', () => {
    const expectedAction = {
      type: TOGGLE_ITEM_VIEW_MODE,
      payload: { id },
    };

    const actualAction = toggleItemViewMode(id);

    expect(actualAction).toEqual(expectedAction);
  });

  // postItem tests
  it('postItem calls fetch with correct arguments', () => {
    const fetch = jest.fn(() => Promise.resolve(getItem));
    const dispatch = (action) => action;
    const postItem = postItemFactory(fetch, () => ueid, receivePostItemErrorMock, receiveItemCreatedMock, parseResponseMock);

    expect.assertions(2);
    return postItem(value)(dispatch).then(() => {
      expect(fetch.mock.calls[0][0]).toEqual(API_VERSION_1 + ITEMS)
      || expect(fetch.mock.calls[0][1]).toEqual({
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
    const postItem = postItemFactory(fetch, () => ueid, receivePostItemErrorMock, receiveItemCreatedMock, parseResponseMock);

    expect.assertions(2);
    return postItem(value)(dispatch).then(() => {
      (expect(dispatch.mock.calls[0][0].payload.value).toEqual(value)
      || expect(dispatch.mock.calls[0][0].payload.ueid).toEqual(ueid));
    });
  });

  it('postItem correctly calls action with given item as a second call in dispatch, with network connection set as online', () => {
    const fetch = () => ({
      response: { ok: true },
      then: () => Promise.resolve(item),
    });
    const dispatch = jest.fn(action => action);
    // customized network connection info
    navigator.__defineGetter__('onLine', function () {
      return true
    });

    const postItem = postItemFactory(fetch, () => ueid, receivePostItemErrorMock, receiveItemCreatedMock, parseResponseMock);

    return postItem(value)(dispatch).then(() => {
      expect(dispatch.mock.calls[1][0].payload.item).toEqual(item);
    });
  });

  // This test will be fixed soon
  xit('postItem correctly calls receivePostItemError as a second call in dispatch, with network connection set as offline', () => {
    const fetch = () => Promise.resolve(getItem);
    const dispatch = jest.fn(action => action);
    // customized network connection info
    navigator.__defineGetter__('onLine', function () {
      return true
    });

    const postItem = postItemFactory(fetch, () => ueid, receivePostItemErrorMock, receiveItemCreatedMock, parseResponseMock);

    return postItem(value)(dispatch).then(() => {
      return expect(dispatch.mock.calls[1][0]).toEqual(new Error('A good chance we are offline. Item was not saved on the server.'))
      || expect(dispatch.mock.calls[1][1]).toBe(ueid);
    });
  });

  // fetchItem tests
  it('fetchItems calls fetch with correct arguments', () => {
    const fetch = jest.fn(() => Promise.resolve(getItem));
    const dispatch = (action => action);
    const fetchItem = fetchItemsFactory(fetch);

    return fetchItem(dispatch).then(() => {
      return expect(fetch.mock.calls[0][0]).toEqual(API_VERSION_1 + ITEMS)
    });
  });

  it('fetchItems correctly dispatches requestItems', () => {
    const fetch = () => Promise.resolve(getItem);
    const dispatch = jest.fn(action => action);
    const fetchItem = fetchItemsFactory(fetch);

    return fetchItem(dispatch).then(() => {
      return expect(dispatch.mock.calls[0][0].type).toEqual(ITEMS_FETCHING_STARTED)
    });
  });

  it('fetchItems dispatches receiveItems with correct argument', () => {
    const fetch = () => ({
      response: { ok: true },
      then: () => Promise.resolve(item),
    });
    const dispatch = jest.fn(action => action);
    const fetchItem = fetchItemsFactory(fetch);

    expect.assertions(2);
    return fetchItem(dispatch).then(() => {
      return expect(dispatch.mock.calls[1][0].type).toEqual(ITEMS_FETCHING_SUCCEED)
        || expect(dispatch.mock.calls[1][0].payload.items).toEqual(item);
    });
  });

  // receiveItemsFetchingError tests
  it('receiveItemsFetchingErrorFactory creates correct action', () => {
      const generateId = () => id;
      const error = new ErrorMessage({ message: 'message' });

      const receiveItemsFetchingError = receiveItemsFetchingErrorFactory(generateId)(error);

      return expect(receiveItemsFetchingError.type).toEqual(ITEMS_FETCHING_FAILED)
        || expect(receiveItemsFetchingError.payload).toEqual({
          id: id,
          message: 'message',
        });
    }
  );

  // receivePostItemFetchingErrorFactory tests
  it('receivePostItemFetchingErrorFactory creates correct action', () => {
      const generateId = () => id;
      const error = new Error('message');

      const receiveItemsFetchingError = receivePostItemErrorFactory(generateId)(error, ueid);

      return expect(receiveItemsFetchingError.type).toEqual(ITEM_SAVE_FAILED)
        || expect(receiveItemsFetchingError.payload).toEqual({
          id,
          itemUeid: ueid,
          message: 'message',
        });
    }
  );
});
