import { postItemFactory } from './postItemFactory';
import { fetchItemsFactory } from './fetchItemsFactory';
import { API_URL } from '../constants/apiUrl';
import { putItemFactory } from './putItemFactory';
import { deleteItemFactory } from './deleteItemFactory';

describe('Async actions', () => {
  const insertItem = jest.fn();
  const updateItem = jest.fn();
  const deleteItem = jest.fn();
  const apiCallSuccess = jest.fn();
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
    apiCallSuccess.mock.calls.length = 0;
    const postTestItem = {
      id: 'e1f5c5e4-7f5e-4aa0-9e52-117cc8267f12',
      text: 'item'
    };
    const post = callResponse(true);
    const postItem = postItemFactory(
      {
        insertItem,
        apiCallSuccess,
        apiCallError: setCallError,
        url: API_URL,
        axios: {
          post,
        }
      });

    postItem(postTestItem.text)(dispatch)
      .then(() => {
        expect(insertItem.mock.calls.length).toBe(1);
        expect(apiCallSuccess.mock.calls.length).toBe(1);
        done();
      })
      .catch(err => console.log(err));
  });

  it('creates TODO_LIST_ITEM_UPDATE, ITEMS_PUT_SUCCESS on correct PUT request', (done) => {
    updateItem.mock.calls.length = 0;
    apiCallSuccess.mock.calls.length = 0;
    const putTestItem = {
      id: 'e1f5c5e4-7f5e-4aa0-9e52-117cc8267f15',
      text: 'item'
    };
    const put = callResponse(true);
    const putItem = putItemFactory(
      {
        updateItem,
        apiCallSuccess: apiCallSuccess,
        apiCallError: setCallError,
        url: API_URL,
        axios: {
          put,
        }
      });

    putItem(putTestItem.id, putTestItem.text)(dispatch)
      .then(() => {
        expect(updateItem.mock.calls.length).toBe(1);
        expect(apiCallSuccess.mock.calls.length).toBe(1);
        done();
      })
      .catch(err => console.log(err));
  });

  it('creates TODO_LIST_ITEM_INSERT, ITEMS_FETCH_SUCCESS on correct GET request', (done) => {
    insertItem.mock.calls.length = 0;
    apiCallSuccess.mock.calls.length = 0;
    const get = callResponse(true);
    const fetchItems = fetchItemsFactory(
      {
        insertItem,
        apiCallSuccess: apiCallSuccess,
        apiCallError: setCallError,
        url: API_URL,
        axios: {
          get,
        }
      });

    fetchItems()(dispatch)
      .then(() => {
        expect(insertItem.mock.calls.length).toBe(1);
        expect(apiCallSuccess.mock.calls.length).toBe(1);
        done();
      })
      .catch(err => console.log(err));
  });

  it('creates TODO_LIST_ITEM_DELETE, ITEMS_DELETE_SUCCESS on correct DELETE request', (done) => {
    deleteItem.mock.calls.length = 0;
    apiCallSuccess.mock.calls.length = 0;
    const deleteTestItem = {
      id: 'e1f5c5e4-7f5e-4aa0-9e52-117cc8267f12',
      text: 'item'
    };
    const deleteIt = deleteItemFactory(
      {
        deleteItem,
        apiCallSuccess: apiCallSuccess,
        apiCallError: setCallError,
        url: API_URL,
        axios: {
          delete: callResponse(true),
        }
      });

    deleteIt(deleteTestItem.id)(dispatch)
      .then(() => {
        expect(deleteItem.mock.calls.length).toBe(1);
        expect(apiCallSuccess.mock.calls.length).toBe(1);
        done();
      })
      .catch(err => console.log(err));
  });

  it('creates TODO_LIST_ITEM_INSERT with correct argument', (done) => {
    insertItem.mock.calls.length = 0;
    const fetchedTestItem = {
      id: 'e1f5c5e4-7f5e-4aa0-9e52-117cc8267f17',
      text: 'item'
    };
    const get = callResponse(true);
    const fetchItems = fetchItemsFactory(
      {
        insertItem,
        apiCallSuccess: apiCallSuccess,
        apiCallError: setCallError,
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
        apiCallSuccess: apiCallSuccess,
        apiCallError: setCallError,
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
        apiCallSuccess: apiCallSuccess,
        apiCallError: setCallError,
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

  it('creates ITEMS_PUT_ERROR on bad PUT request', (done) => {
    setCallError.mock.calls.length = 0;
    const putTestItem = {
      id: 'e1f5c5e4-7f5e-4aa0-9e52-117cc8267f13',
      text: 'item'
    };
    const put = callResponse(false);
    const putItem = putItemFactory(
      {
        updateItem,
        apiCallSuccess: apiCallSuccess,
        apiCallError: setCallError,
        url: API_URL,
        axios: {
          put,
        }
      });

    putItem(putTestItem.id, putTestItem.text)(dispatch)
      .then(() => {
        expect(setCallError.mock.calls.length).toBe(1);
        done();
      })
      .catch(err => console.log(err));
  });

  it('creates ITEMS_DELETE_ERROR on bad DELETE request', (done) => {
    setCallError.mock.calls.length = 0;
    const deleteTestItem = {
      id: 'e1f5c5e4-7f5e-4aa0-9e52-117cc8267f13',
      text: 'item'
    };
    const deleteIt = deleteItemFactory(
      {
        deleteItem,
        apiCallSuccess: apiCallSuccess,
        apiCallError: setCallError,
        url: API_URL,
        axios: {
          delete: callResponse(false),
        }
      });

    deleteIt(deleteTestItem.id)(dispatch)
      .then(() => {
        expect(setCallError.mock.calls.length).toBe(1);
        done();
      })
      .catch(err => console.log(err));
  });
});
