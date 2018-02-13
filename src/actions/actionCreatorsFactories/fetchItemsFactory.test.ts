import { fetchItemsFactory } from './fetchItemsFactory';

describe('fetch items tests', () => {
  const insertItem = jest.fn();
  const fetchSuccess = jest.fn();
  const fetchError = jest.fn();
  const dispatch = jest.fn(input => input);
  const fetchedTestItem0 = {
    id: 'e1f5c5e4-7f5e-4aa0-9e52-117cc8267333',
    text: 'item0'
  };
  const fetchedTestItem1 = {
    id: 'e1f5c5e4-7f5e-4aa0-9e52-117cc8267444',
    text: 'item1'
  };

  it('creates TODO_LIST_ITEM_INSERT, ITEMS_FETCH_SUCCESS on correct GET request', () => {
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
    const get = (url: string) =>
      new Promise((resolve) => resolve({
        data: items
      }));
    const fetchItems = fetchItemsFactory(
      {
        insertItem,
        fetchSuccess,
        fetchError,
        getAxios: () => ({
          axios: {
            get
          },
          url: 'fake_url'
        })
      });

    fetchItems()(dispatch)
      .then(() => {
        expect(insertItem.mock.calls.length).toEqual(items.length);
        expect(fetchSuccess.mock.calls.length).toBe(1);
      })
      .catch(err => console.log(err));
  });

  it('creates TODO_LIST_ITEM_INSERT with correct arguments', () => {
    insertItem.mock.calls.length = 0;
    const items = [{
      Id: fetchedTestItem0.id,
      Text: fetchedTestItem0.text
    },
      {
        Id: fetchedTestItem1.id,
        Text: fetchedTestItem1.text
      }];
    const get = (url: string) =>
      new Promise((resolve) => resolve({
        data: items
      }));
    const fetchItems = fetchItemsFactory(
      {
        insertItem,
        fetchSuccess,
        fetchError,
        getAxios: () => ({
          axios: {
            get
          },
          url: 'fake_url'
        })
      });

    fetchItems()(dispatch)
      .then(() => {
        expect(insertItem.mock.calls[0][0].id).toEqual(fetchedTestItem0.id);
        expect(insertItem.mock.calls[0][0].text).toEqual(fetchedTestItem0.text);
        expect(insertItem.mock.calls[0][0].isSynchronized).toBe(true);
        expect(insertItem.mock.calls[1][0].id).toEqual(fetchedTestItem1.id);
        expect(insertItem.mock.calls[1][0].text).toEqual(fetchedTestItem1.text);
        expect(insertItem.mock.calls[1][0].isSynchronized).toBe(true);
      })
      .catch(err => console.log(err));
  });

  it('creates ITEMS_FETCH_ERROR after GET request failure', () => {
    fetchError.mock.calls.length = 0;
    const get = (url: string) =>
      new Promise((_resolve, reject) => reject({
        response: {
          status: 400,
          statusText: 'BadRequest',
        }
      }));
    const fetchItems = fetchItemsFactory(
      {
        insertItem,
        fetchSuccess,
        fetchError,
        getAxios: () => ({
          axios: {
            get
          },
          url: 'fake_url'
        })
      });

    fetchItems()(dispatch)
      .then(() => {
        expect(fetchError.mock.calls.length).toBe(1);
      })
      .catch(err => console.log(err));
  });
});
