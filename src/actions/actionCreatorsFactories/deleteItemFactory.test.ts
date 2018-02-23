/*
import { deleteItemFactory } from './deleteItemFactory';
import { OPERATION_FAILED } from '../../constants/connection';

describe('delete item tests', () => {
  const deleteItem = jest.fn();
  const deleteSuccess = jest.fn();
  const deleteError = jest.fn();
  const dispatch = jest.fn(input => input);
  const id = 'a378ffaa-75fa-4117-a57b-84da0a3c975a';

  it('creates ITEM_DELETE_SUCCESS after successful DELETE request', (done) => {
    deleteSuccess.mock.calls.length = 0;
    const axiosDelete = (_url: string) =>
      Promise.resolve({});
    const deleteFromServer = deleteItemFactory({
      deleteItem,
      deleteSuccess,
      deleteError,
      getAxios: ({
        axios: {
          delete: axiosDelete
        },
        url: 'fake_url'
      })
    });

    deleteFromServer(id)(dispatch)
      .then(() => {
        expect(deleteSuccess.mock.calls.length).toEqual(1);
        done();
      })
      .catch(err => console.log(err));
  });

  it('creates ITEM_DELETE_ERROR after unsuccessful DELETE request', (done) => {
    deleteError.mock.calls.length = 0;
    const axiosDelete = (_url: string) =>
      Promise.reject({
        response: {
          status: 400,
          statusText: 'BadRequest'
        }
      });
    const deleteFromServer = deleteItemFactory({
      deleteItem,
      deleteSuccess,
      deleteError,
      getAxios: ({
        axios: {
          delete: axiosDelete
        },
        url: 'fake_url'
      })
    });

    deleteFromServer(id)(dispatch)
      .then(() => {
        expect(deleteError.mock.calls.length).toEqual(1);
        expect(deleteError.mock.calls[0][0].message).toEqual(OPERATION_FAILED);
        done();
      });
  });
});
*/
