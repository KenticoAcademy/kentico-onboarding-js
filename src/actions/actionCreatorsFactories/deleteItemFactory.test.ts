import { deleteItemFactory } from './deleteItemFactory';
import { OPERATION_FAILED } from '../../constants/connection';
import {
  DELETE_ITEM_ERROR,
  DELETE_ITEM_SUCCESS,
  TODO_LIST_ITEM_DELETE
} from '../../constants/actionTypes';

const dispatch = jest.fn(input => input);
const id = 'a378ffaa-75fa-4117-a57b-84da0a3c975a';

beforeEach(() => {
  dispatch.mock.calls.length = 0;
});

describe('delete item tests', () => {
  it('dispatches TODO_LIST_ITEM_DELETE, DELETE_ITEM_SUCCESS after successful DELETE request', async () => {
    const axiosDelete = (_id: string) =>
      Promise.resolve({
        data: undefined,
        status: 204,
        statusText: 'No Content',
        headers: undefined,
        config: {}
      });
    const deleteFromServer = deleteItemFactory({
      axiosDelete
    });
    const deleteItem = {
      type: TODO_LIST_ITEM_DELETE,
      payload: {
        id
      }
    };
    const deleteSuccess = {
      type: DELETE_ITEM_SUCCESS,
      payload: {
        id
      }
    };

    await deleteFromServer(id)(dispatch);

    expect(dispatch.mock.calls[0][0]).toEqual(deleteItem);
    expect(dispatch.mock.calls[1][0]).toEqual(deleteSuccess);
  });

  it('dispatches TODO_LIST_ITEM_DELETE, DELETE_ITEM_ERROR after unsuccessful DELETE request', async () => {
    const axiosDelete = (_id: string) =>
      Promise.reject({
        response: {
          data: undefined,
          status: 404,
          statusText: 'Not Found',
          headers: undefined,
          config: {},
        },
      });
    const deleteFromServer = deleteItemFactory({
      axiosDelete
    });
    const deleteItem = {
      type: TODO_LIST_ITEM_DELETE,
      payload: {
        id
      }
    };
    const deleteErrorItem = {
      type: DELETE_ITEM_ERROR,
      payload: {
        id,
        message: OPERATION_FAILED
      }
    };

    await deleteFromServer(id)(dispatch);

    expect(dispatch.mock.calls[0][0]).toEqual(deleteItem);
    expect(dispatch.mock.calls[1][0]).toEqual(deleteErrorItem);
  });
});
