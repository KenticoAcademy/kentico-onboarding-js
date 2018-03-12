import { fetchItemsFactory } from './fetchItemsFactory';

describe('fetch items tests', () => {
  const insertItem = jest.fn();
  const fetchSuccess = jest.fn();
  const fetchError = jest.fn();
  const dispatch = jest.fn(input => input);
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

  it('creates TODO_LIST_ITEM_INSERT, FETCH_ITEMS_SUCCESS on correct GET request', (done) => {
    insertItem.mock.calls.length = 0;
    fetchSuccess.mock.calls.length = 0;
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

    fetchItems()(dispatch)
      .then(() => {
        expect(insertItem.mock.calls.length).toEqual(items.length);
        expect(fetchSuccess.mock.calls.length).toBe(1);
        done();
      })
      .catch(err => console.log(err));
  });

  it('creates TODO_LIST_ITEM_INSERT with correct arguments', (done) => {
    insertItem.mock.calls.length = 0;
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

    fetchItems()(dispatch)
      .then(() => {
        expect(insertItem.mock.calls[0][0]).toEqual(fetchedTestItem0);
        expect(insertItem.mock.calls[1][0]).toEqual(fetchedTestItem1);
        done();
      })
      .catch(err => console.log(err));
  });

  it('creates FETCH_ITEMS_ERROR after GET request failure', (done) => {
    fetchError.mock.calls.length = 0;
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

    fetchItems()(dispatch)
      .then(() => {
        expect(fetchError.mock.calls.length).toBe(1);
        done();
      })
      .catch(err => console.log(err));
  });
});
