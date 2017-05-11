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
  ITEM_POST_FAILED,
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
    const fetchItem = postItemFactory(fetch)(() => ueid);

    return fetchItem(value)(dispatch).then(() => {
      return expect(fetch.mock.calls[0][0]).toEqual(API_VERSION_1 + ITEMS)
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
    const postItem = postItemFactory(fetch)(() => ueid);

    expect.assertions(2);
    return postItem(value)(dispatch).then(() => {
      return (expect(dispatch.mock.calls[0][0].payload.value).toEqual(value)
      || expect(dispatch.mock.calls[0][0].payload.ueid).toEqual(ueid));
    });
  });

  it('postItem correctly calls action with given item as a second call in dispatch', () => {
    const fetch = () => ({
      response: { ok: true },
      then: () => Promise.resolve(item),
    });
    const dispatch = jest.fn(action => action);
    const postItem = postItemFactory(fetch)(() => ueid);

    return postItem(value)(dispatch).then(() => {
      return expect(dispatch.mock.calls[1][0].payload.item).toEqual(item);
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

      return expect(receiveItemsFetchingError.type).toEqual(ITEM_POST_FAILED)
        || expect(receiveItemsFetchingError.payload).toEqual({
          id,
          itemUeid: ueid,
          message: 'message',
        });
    }
  );
});
