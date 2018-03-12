import { putItemFactory } from './putItemFactory';
import { Uuid } from '../../utils/generateId';

describe('put item tests', () => {
  const updateItem = jest.fn();
  const putSuccess = jest.fn();
  const putError = jest.fn();
  const dispatch = jest.fn(input => input);

  it('creates PUT_ITEM_SUCCESS after successful PUT request', (done) => {
    putSuccess.mock.calls.length = 0;
    const updatedItem = {
      id: '9a0b391a-2a57-4be1-8179-7271b5e8cdc3',
      text: 'updatedText',
    };
    const axiosPut = (_data: {id: Uuid, text: string}) =>
      Promise.resolve({
        data: updatedItem,
        status: 200,
        statusText: 'OK',
        headers: undefined,
        config: {}
      });
    const putItem = putItemFactory({
      updateItem,
      putSuccess,
      putError,
      axiosPut
    });

    putItem({id: updatedItem.id, text: updatedItem.text})(dispatch)
      .then(() => {
        expect(putSuccess.mock.calls.length).toEqual(1);
        done();
      })
      .catch(err => console.log(err));
  });

  it('creates PUT_ITEM_SUCCESS with correct arguments after successful PUT request', (done) => {
    putSuccess.mock.calls.length = 0;
    const updatedItem = {
      id: '9a0b391a-2a57-4be1-8179-7271b5e8cdc3',
      text: 'updatedText',
    };
    const axiosPut = (_data: {id: Uuid, text: string}) =>
      Promise.resolve({
        data: updatedItem,
        status: 200,
        statusText: 'OK',
        headers: undefined,
        config: {},
      });
    const putItem = putItemFactory({
      updateItem,
      putSuccess,
      putError,
      axiosPut
    });

    putItem({id: updatedItem.id, text: updatedItem.text})(dispatch)
      .then(() => {
        expect(putSuccess.mock.calls[0][0]).toEqual(updatedItem.id);
        done();
      })
      .catch(err => console.log(err));
  });

  it('creates PUT_ITEM_ERROR after unsuccessful PUT request', (done) => {
    putError.mock.calls.length = 0;
    const errorMessage = 'Bad Request';
    const updatedItem = {
      id: '9a0b391a-2a57-4be1-8179-7271b5e8cdc3',
      text: 'updatedText',
    };
    const axiosPut = (_data: {id: Uuid, text: string}) =>
      Promise.reject({
        response: {
          data: undefined,
          status: 200,
          statusText: errorMessage,
          headers: undefined,
          config: {}
        }
      });
    const putItem = putItemFactory({
      updateItem,
      putSuccess,
      putError,
      axiosPut
    });

    putItem({id: updatedItem.id, text: updatedItem.text})(dispatch)
      .then(() => {
        expect(putError.mock.calls.length).toEqual(1);
        expect(putError.mock.calls[0][0]).toEqual({
          id: updatedItem.id,
          message: errorMessage
        });
        done();
      })
      .catch(err => console.log(err));
  });
});
