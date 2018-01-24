import { postItemFactory } from './postItemFactory';
import { fetchItemsFactory } from './fetchItemsFactory';
import { API_URL } from '../constants/apiUrl';

const MockAdapter = require('axios-mock-adapter');
const axios = require('axios');
const mock = new MockAdapter(axios);

describe('Async actions', () => {
  const insertItem = jest.fn();
  const setCallSuccess = jest.fn();
  const setCallError = jest.fn();
  const dispatch = jest.fn(input => input);

  const fetchItems = fetchItemsFactory(
    {
      insertItem,
      setCallSuccess,
      setCallError,
      url: API_URL,
      axios
    });
  const postItem = postItemFactory(
    {
      insertItem,
      setCallSuccess,
      setCallError,
      url: API_URL,
      axios
    });

  it('creates TODO_LIST_ITEM_INSERT, ITEMS_POST_SUCCESS on correct POST request', (done) => {
    insertItem.mock.calls.length = 0;
    setCallSuccess.mock.calls.length = 0;
    const postTestItem = {
      id: 'e1f5c5e4-7f5e-4aa0-9e52-117cc8267f12',
      text: 'item'
    };
    mock.onPost(API_URL).reply(201, {
        Id: postTestItem.id,
        Text: postTestItem.text
      }
    );

    postItem(postTestItem.text)(dispatch)
      .then(() => {
        expect(insertItem.mock.calls.length).toBe(1);
        expect(setCallSuccess.mock.calls.length).toBe(1);
        done();
      })
      .catch(err => console.log(err));
  });

  it('creates TODO_LIST_ITEM_INSERT, ITEMS_FETCH_SUCCESS on correct GET request', (done) => {
    insertItem.mock.calls.length = 0;
    setCallSuccess.mock.calls.length = 0;
    const fetchedTestItem = {
      id: 'e1f5c5e4-7f5e-4aa0-9e52-117cc8267f13',
      text: 'item'
    };
    mock.onGet(API_URL).reply(200, [
        {
          Id: fetchedTestItem.id,
          Text: fetchedTestItem.text
        }
      ]
    );

    fetchItems()(dispatch)
      .then(() => {
        expect(insertItem.mock.calls.length).toBe(1);
        expect(setCallSuccess.mock.calls.length).toBe(1);
        done();
      })
      .catch((err: any) => console.log(err));
  });

  it('creates TODO_LIST_ITEM_INSERT with correct argument', (done) => {
    insertItem.mock.calls.length = 0;
    const fetchedTestItem = {
      id: 'e1f5c5e4-7f5e-4aa0-9e52-117cc8267f13',
      text: 'item'
    };
    mock.onGet(API_URL).reply(200, [
        {
          Id: fetchedTestItem.id,
          Text: fetchedTestItem.text
        }
      ]
    );

    fetchItems()(dispatch)
      .then(() => {
        expect(insertItem.mock.calls[0][0]).toBe(fetchedTestItem.text);
        done();
      })
      .catch((err: any) => console.log(err));
  });

  it('creates ITEMS_FETCH_ERROR on bad GET request', (done) => {
    setCallError.mock.calls.length = 0;
    mock.restore();
    mock.onGet(API_URL).reply(400);

    fetchItems()(dispatch)
      .then(() => {
        expect(setCallError.mock.calls.length).toBe(1);
        done();
      })
      .catch((err: any) => console.log(err));
  });

  it('creates ITEMS_POST_ERROR on bad POST request', (done) => {
    setCallError.mock.calls.length = 0;
    const newItemText = 'item';
    mock.restore();
    mock.onGet(API_URL).reply(400);

    postItem(newItemText)(dispatch)
      .then(() => {
        expect(setCallError.mock.calls.length).toBe(1);
        done();
      })
      .catch(err => console.log(err));
  });
});
