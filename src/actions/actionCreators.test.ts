import { postItemFactory } from './postItemFactory';
import { fetchItemsFactory } from './fetchItemsFactory';
import { API_URL } from '../constants/apiUrl';

describe('Async actions', () => {
  const insertItem = jest.fn();
  const setCallSuccess = jest.fn();
  const setCallError = jest.fn();
  const dispatch = jest.fn(input => input);

  const callResponse = (isSuccessful: boolean) => (_url: string) => new Promise((resolve, reject) => {
    if (isSuccessful) {
      resolve({
        data: [{
          Id: 'e1f5c5e4-7f5e-4aa0-9e52-117cc8267f13',
          Text: 'item'
        }],
      });
    } else {
      reject({
        response:
          { status: 400,
            statusText: 'Bad Request',
          }
      });
    }
  });

  it('creates TODO_LIST_ITEM_INSERT, ITEMS_POST_SUCCESS on correct POST request', (done) => {
    insertItem.mock.calls.length = 0;
    setCallSuccess.mock.calls.length = 0;
    const postTestItem = {
      id: 'e1f5c5e4-7f5e-4aa0-9e52-117cc8267f12',
      text: 'item'
    };
    const post = callResponse(true);
    const postItem = postItemFactory(
      {
        insertItem,
        setCallSuccess,
        setCallError,
        url: API_URL,
        axios: {
          post,
        }
      });

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
    const get = callResponse(true);
    const fetchItems = fetchItemsFactory(
      {
        insertItem,
        setCallSuccess,
        setCallError,
        url: API_URL,
        axios: {
          get,
        }
      });

    fetchItems()(dispatch)
      .then(() => {
        expect(insertItem.mock.calls.length).toBe(1);
        expect(setCallSuccess.mock.calls.length).toBe(1);
        done();
      })
      .catch(err => console.log(err));
  });

  it('creates TODO_LIST_ITEM_INSERT with correct argument', (done) => {
    insertItem.mock.calls.length = 0;
    const fetchedTestItem = {
      id: 'e1f5c5e4-7f5e-4aa0-9e52-117cc8267f13',
      text: 'item'
    };
    const get = callResponse(true);
    const fetchItems = fetchItemsFactory(
      {
        insertItem,
        setCallSuccess,
        setCallError,
        url: API_URL,
        axios: {
          get,
        }
      });

    fetchItems()(dispatch)
      .then(() => {
        expect(insertItem.mock.calls[0][0]).toBe(fetchedTestItem.text);
        done();
      })
      .catch(err => console.log(err));
  });

  it('creates ITEMS_FETCH_ERROR on bad GET request', (done) => {
    setCallError.mock.calls.length = 0;
    const get = callResponse(false);
    const fetchItems = fetchItemsFactory(
      {
        insertItem,
        setCallSuccess,
        setCallError,
        url: API_URL,
        axios: {
          get,
        }
      });

    fetchItems()(dispatch)
      .then(() => {
        expect(setCallError.mock.calls.length).toBe(1);
        done();
      })
      .catch(err => console.log(err));
  });

  it('creates ITEMS_POST_ERROR on bad POST request', (done) => {
    setCallError.mock.calls.length = 0;
    const newItemText = 'item';
    const post = callResponse(false);
    const postItem = postItemFactory(
      {
        insertItem,
        setCallSuccess,
        setCallError,
        url: API_URL,
        axios: {
          post,
        }
      });

    postItem(newItemText)(dispatch)
      .then(() => {
        expect(setCallError.mock.calls.length).toBe(1);
        done();
      })
      .catch(err => console.log(err));
  });
});
