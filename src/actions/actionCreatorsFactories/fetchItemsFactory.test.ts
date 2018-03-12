import { fetchItemsFactory } from './fetchItemsFactory';

const insertItemName = 'insertItem';
const fetchSuccessName = 'fetchSuccess';
const fetchErrorName = 'fetchError';
const insertItem = jest.fn(() => insertItemName);
const fetchSuccess = jest.fn(() => fetchSuccessName);
const fetchError = jest.fn(() => fetchErrorName);
const dispatch = jest.fn(input => input);

beforeEach(() => {
  insertItem.mock.calls.length = 0;
  fetchSuccess.mock.calls.length = 0;
  fetchError.mock.calls.length = 0;
  dispatch.mock.calls.length = 0;
});

describe('fetch items tests', () => {
  const fetchedTestItem0 = {
    id: 'e1f5c5e4-7f5e-4aa0-9e52-117cc8267333',
    text: 'item0',
    isSynchronized: true
  };
  const fetchedTestItem1 = {
    id: 'e1f5c5e4-7f5e-4aa0-9e52-117cc8267444',
    text: 'item1',
    isSynchronized: true
  };

  it('dispatches TODO_LIST_ITEM_INSERT, FETCH_ITEMS_SUCCESS on correct GET request', async () => {
    const items = [{
      Id: fetchedTestItem0.id,
      Text: fetchedTestItem0.text
    },
      {
        Id: fetchedTestItem1.id,
        Text: fetchedTestItem1.text
      }];
    const axiosFetch = () =>
      Promise.resolve({
        data: items,
        status: 200,
        statusText: 'OK',
        headers: undefined,
        config: {},
      });
    const fetchItems = fetchItemsFactory(
      {
        insertItem,
        fetchSuccess,
        fetchError,
        axiosFetch
      });

    await fetchItems()(dispatch);

    expect(insertItem.mock.calls.length).toEqual(items.length);
    expect(dispatch.mock.calls[items.length][0]).toEqual(fetchSuccessName);
  });

  it('creates TODO_LIST_ITEM_INSERT with correct arguments', async () => {
    const items = [{
      id: fetchedTestItem0.id,
      text: fetchedTestItem0.text
    },
      {
        id: fetchedTestItem1.id,
        text: fetchedTestItem1.text
      }];
    const axiosFetch = () =>
      Promise.resolve({
        data: items,
        status: 200,
        statusText: 'OK',
        headers: undefined,
        config: {},
      });
    const fetchItems = fetchItemsFactory(
      {
        insertItem,
        fetchSuccess,
        fetchError,
        axiosFetch
      });

    await fetchItems()(dispatch);

    expect(insertItem.mock.calls[0][0]).toEqual(fetchedTestItem0);
    expect(insertItem.mock.calls[1][0]).toEqual(fetchedTestItem1);
  });

  it('dispatches FETCH_ITEMS_ERROR after GET request failure', async () => {
    const axiosFetch = () =>
      Promise.reject({
        response: {
          data: undefined,
          status: 404,
          statusText: 'Not Found',
          headers: undefined,
          config: {}
        }
      });
    const fetchItems = fetchItemsFactory(
      {
        insertItem,
        fetchSuccess,
        fetchError,
        axiosFetch
      });

    await fetchItems()(dispatch);

    expect(dispatch.mock.calls[0][0]).toEqual(fetchErrorName);
  });
});
