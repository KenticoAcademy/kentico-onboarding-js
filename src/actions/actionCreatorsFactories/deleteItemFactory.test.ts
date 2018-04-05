import { deleteItemFactory } from './deleteItemFactory';
import { OPERATION_FAILED } from '../../constants/connection';
import {
  ITEM_DELETION_FAILED,
  ITEM_DELETION_SUCCEEDED,
  TODO_LIST_ITEM_DELETE
} from '../../constants/actionTypes';

const dispatch = jest.fn(input => input);
const id = 'a378ffaa-75fa-4117-a57b-84da0a3c975a';

beforeEach(() => {
  dispatch.mock.calls.length = 0;
});

describe('delete item tests', () => {
  it('dispatches TODO_LIST_ITEM_DELETE, ITEM_DELETION_SUCCEEDED after successful DELETE request', async () => {
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
    const deletionSucceeded = {
      type: ITEM_DELETION_SUCCEEDED,
      payload: {
        id
      }
    };

    await deleteFromServer(id)(dispatch);

    expect(dispatch.mock.calls[0][0]).toEqual(deleteItem);
    expect(dispatch.mock.calls[1][0]).toEqual(deletionSucceeded);
  });

  it('dispatches TODO_LIST_ITEM_DELETE, ITEM_DELETION_FAILED after unsuccessful DELETE request', async () => {
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
    const deletionFailed = {
      type: ITEM_DELETION_FAILED,
      payload: {
        id,
        message: OPERATION_FAILED
      }
    };

    await deleteFromServer(id)(dispatch);

    expect(dispatch.mock.calls[0][0]).toEqual(deleteItem);
    expect(dispatch.mock.calls[1][0]).toEqual(deletionFailed);
  });
});
