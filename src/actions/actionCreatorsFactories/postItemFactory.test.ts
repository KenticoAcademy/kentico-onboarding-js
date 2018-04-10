import { postItemFactory } from './postItemFactory';
import { ITEM_INSERT_FAILED, ITEM_INSERT_SUCCEEDED, TODO_LIST_ITEM_INSERT } from '../../constants/actionTypes';

const dispatch = jest.fn(input => input);

beforeEach(() => {
  dispatch.mock.calls.length = 0;
});

describe('post item tests', () => {
  const postTestItem = {
    id: 'e1f5c5e4-7f5e-4aa0-9e52-117cc8267f12',
    text: 'item'
  };
  const generateId = jest.fn(() => postTestItem.id);

  it('dispatches TODO_LIST_ITEM_INSERT, ITEM_INSERT_SUCCEEDED on correct POST request', async () => {
    const fetchedTestItem = {
      id: 'e1f5c5e4-7f5e-4aa0-9e52-117cc8267f13',
      text: 'item'
    };
    const axiosPost = (_text: string) =>
      Promise.resolve({
        data: {...fetchedTestItem},
        status: 201,
        statusText: 'Created',
        headers: undefined,
        config: {},
      });
    const postItem = postItemFactory({
        generateId,
        axiosPost
      });
    const insertItem = {
      type: TODO_LIST_ITEM_INSERT,
      payload: {
        ...postTestItem,
        isSynchronized: false,
      }
    };
    const postItemSucceeded = {
      type: ITEM_INSERT_SUCCEEDED,
      payload: {
        newId: fetchedTestItem.id,
        ...postTestItem,
        isSynchronized: true,
      }
    };

    await postItem(postTestItem.text)(dispatch);

    expect(dispatch.mock.calls[0][0]).toEqual(insertItem);
    expect(dispatch.mock.calls[1][0]).toEqual(postItemSucceeded);
  });

  it('dispatches TODO_LIST_ITEM_INSERT, ITEM_INSERT_FAILED on POST request failure', async () => {
    const axiosPost = (_text: string) =>
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
        generateId,
        axiosPost
      });
    const insertItem = {
      type: TODO_LIST_ITEM_INSERT,
      payload: {
        ...postTestItem,
        isSynchronized: false,
      }
    };
    const postItemFailed = {
      type: ITEM_INSERT_FAILED,
      payload: {
        id: postTestItem.id,
        errorId: postTestItem.id,
        message: '400 Bad Request'
      }
    };

    await postItem(postTestItem.text)(dispatch);

    expect(dispatch.mock.calls[0][0]).toEqual(insertItem);
    expect(dispatch.mock.calls[1][0]).toEqual(postItemFailed);
  });
});
