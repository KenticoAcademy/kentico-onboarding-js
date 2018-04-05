import { fetchItemsFactory } from './fetchItemsFactory';
import { FETCH_ITEMS_ERROR, FETCH_ITEMS_SUCCESS } from '../../constants/actionTypes';

const dispatch = jest.fn(input => input);

beforeEach(() => {
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
        axiosFetch
      });
    const fetchSuccess = {
      type: FETCH_ITEMS_SUCCESS
    };

    await fetchItems()(dispatch);

    expect(dispatch.mock.calls.length).toEqual(items.length + 1);
    expect(dispatch.mock.calls[items.length][0]).toEqual(fetchSuccess);
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
        axiosFetch
      });

    await fetchItems()(dispatch);

    expect(dispatch.mock.calls[0][0].payload).toEqual(fetchedTestItem0);
    expect(dispatch.mock.calls[1][0].payload).toEqual(fetchedTestItem1);
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
        axiosFetch
      });
    const fetchError = {
      type: FETCH_ITEMS_ERROR,
      payload: {
        errorText: '404 Not Found'
      }
    };

    await fetchItems()(dispatch);

    expect(dispatch.mock.calls[0][0]).toEqual(fetchError);
  });
});
