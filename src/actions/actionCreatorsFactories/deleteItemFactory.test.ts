import { deleteItemFactory } from './deleteItemFactory';
import { OPERATION_FAILED } from '../../constants/connection';

const deleteItemName = 'deleteItem';
const deleteSuccessName = 'deleteSuccess';
const deleteErrorName = 'deleteError';
const deleteItem = jest.fn(() => deleteItemName);
const deleteSuccess = jest.fn(() => deleteSuccessName);
const deleteError = jest.fn(() => deleteErrorName);
const dispatch = jest.fn(input => input);
const id = 'a378ffaa-75fa-4117-a57b-84da0a3c975a';

beforeEach(() => {
  deleteItem.mock.calls.length = 0;
  deleteError.mock.calls.length = 0;
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
      deleteItem,
      deleteSuccess,
      deleteError,
      axiosDelete
    });

    await deleteFromServer(id)(dispatch);

    expect(dispatch.mock.calls[0][0]).toEqual(deleteItemName);
    expect(dispatch.mock.calls[1][0]).toEqual(deleteSuccessName);
  });

  it('dispatches TODO_LIST_ITEM_DELETE, DELETE_ITEM_ERROR after unsuccessful DELETE request', async () => {
    deleteError.mock.calls.length = 0;
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
      deleteItem,
      deleteSuccess,
      deleteError,
      axiosDelete
    });

    await deleteFromServer(id)(dispatch);

    expect(dispatch.mock.calls[0][0]).toEqual(deleteItemName);
    expect(dispatch.mock.calls[1][0]).toEqual(deleteErrorName);
    expect(deleteError.mock.calls[0][0].message).toEqual(OPERATION_FAILED);
  });
});
