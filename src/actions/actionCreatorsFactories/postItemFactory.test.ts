import { postItemFactory } from './postItemFactory';

const postSuccessName = 'postSuccess';
const postErrorName = 'postError';
const insertItemName = 'insertItem';
const postSuccess = jest.fn(() => postSuccessName);
const dispatch = jest.fn(input => input);
const postError = jest.fn(() => postErrorName);
const insertItem = jest.fn(() => insertItemName);

beforeEach(() => {
  postSuccess.mock.calls.length = 0;
  postError.mock.calls.length = 0;
  dispatch.mock.calls.length = 0;
});

describe('post item tests', () => {
  const postTestItem = {
    id: 'e1f5c5e4-7f5e-4aa0-9e52-117cc8267f12',
    text: 'item'
  };

  it('dispatches TODO_LIST_ITEM_INSERT, POST_ITEM_SUCCESS on correct POST request', async () => {
    const generateId = jest.fn();
    const fetchedTestItem = {
      id: 'e1f5c5e4-7f5e-4aa0-9e52-117cc8267f13',
      text: 'item'
    };
    const axiosPost = (_data: {text: string}) =>
      Promise.resolve({
        data: [{
          id: fetchedTestItem.id,
          text: fetchedTestItem.text
        }],
        status: 201,
        statusText: 'Created',
        headers: undefined,
        config: {},
      });
    const postItem = postItemFactory(
      {
        insertItem,
        generateId,
        postSuccess,
        postError,
        axiosPost
      });

    await postItem(postTestItem.text)(dispatch);

    expect(dispatch.mock.calls[0][0]).toEqual(insertItemName);
    expect(dispatch.mock.calls[1][0]).toEqual(postSuccessName);
  });

  it('creates POST_ITEM_SUCCESS with correct arguments', async () => {
    const generateId = jest.fn(() => postTestItem.id);
    const fetchedTestItem = {
      id: 'e1f5c5e4-7f5e-4aa0-9e52-117cc8267f13',
      text: 'item'
    };
    const axiosPost = (_data: {text: string}) =>
      Promise.resolve({
        data: {
          id: fetchedTestItem.id,
          text: fetchedTestItem.text
        },
        status: 201,
        statusText: 'Created',
        headers: undefined,
        config: {},
      });
    const postItem = postItemFactory(
      {
        insertItem,
        generateId,
        postSuccess,
        postError,
        axiosPost
      });

    await postItem(postTestItem.text)(dispatch);

    expect(postSuccess.mock.calls[0][0].newId).toEqual(fetchedTestItem.id);
    expect(postSuccess.mock.calls[0][0].id).toEqual(postTestItem.id);
    expect(postSuccess.mock.calls[0][0].text).toEqual(fetchedTestItem.text);
    expect(postSuccess.mock.calls[0][0].isSynchronized).toEqual(true);
  });

  it('dispatches TODO_LIST_ITEM_INSERT, POST_ITEM_ERROR on POST request failure', async () => {
    const generateId = jest.fn();
    const axiosPost = (_data: {text: string}) =>
      Promise.reject({
        response: {
          data: undefined,
          status: 400,
          statusText: 'Bad Request',
          headers: undefined,
          config: {},
        },
      });
    const postItem = postItemFactory(
      {
        insertItem,
        generateId,
        postSuccess,
        postError,
        axiosPost
      });

    await postItem(postTestItem.text)(dispatch);

    expect(dispatch.mock.calls[0][0]).toEqual(insertItemName);
    expect(dispatch.mock.calls[1][0]).toEqual(postErrorName);
  });
});
