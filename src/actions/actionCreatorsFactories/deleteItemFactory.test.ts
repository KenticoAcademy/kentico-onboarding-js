import { deleteItemFactory } from './deleteItemFactory';
import { OPERATION_FAILED } from '../../constants/connection';

describe('delete item tests', () => {
  const deleteItem = jest.fn();
  const deleteSuccess = jest.fn();
  const deleteError = jest.fn();
  const dispatch = jest.fn(input => input);
  const id = 'a378ffaa-75fa-4117-a57b-84da0a3c975a';

  it('creates DELETE_ITEM_SUCCESS after successful DELETE request', async () => {
    deleteSuccess.mock.calls.length = 0;
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

    expect(deleteSuccess.mock.calls.length).toEqual(1);
  });

  it('creates DELETE_ITEM_ERROR after unsuccessful DELETE request', async () => {
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

    expect(deleteError.mock.calls.length).toEqual(1);
    expect(deleteError.mock.calls[0][0].message).toEqual(OPERATION_FAILED);
  });
});
