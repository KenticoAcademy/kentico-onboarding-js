import { fetchItemsFactory } from './fetchItemsFactory';
import { ITEMS_FETCH_FAILED } from '../../constants/actionTypes';

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

  it('dispatches ITEMS_FETCH_SUCCEEDED on correct GET request', async () => {
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
    const fetchItems = fetchItemsFactory({
        axiosFetch
      });
    const expectedAction = {
      type: 'ITEMS_FETCH_SUCCEEDED',
      payload: {
        items
      }
    };

    await fetchItems()(dispatch);

    expect(dispatch.mock.calls[0][0]).toEqual(expectedAction);
  });

  it('dispatches ITEMS_FETCH_FAILED after GET request failure', async () => {
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
    const fetchItems = fetchItemsFactory({
        axiosFetch
      });
    const fetchFailed = {
      type: ITEMS_FETCH_FAILED,
      payload: {
        errorText: '404 Not Found'
      }
    };

    await fetchItems()(dispatch);

    expect(dispatch.mock.calls[0][0]).toEqual(fetchFailed);
  });
});
