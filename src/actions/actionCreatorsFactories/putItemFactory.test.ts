import { putItemFactory } from './putItemFactory';
import { Uuid } from '../../utils/generateId';

const updateItemName = 'updateItem';
const putSuccessName = 'putSuccess';
const putErrorName = 'putError';
const updateItem = jest.fn(() => updateItemName);
const putSuccess = jest.fn(() => putSuccessName);
const putError = jest.fn(() => putErrorName);
const dispatch = jest.fn(input => input);

beforeEach(() => {
  putSuccess.mock.calls.length = 0;
  putError.mock.calls.length = 0;
  dispatch.mock.calls.length = 0;
});

describe('put item tests', () => {
  it('dispatches TODO_LIST_ITEM_UPDATE, PUT_ITEM_SUCCESS after successful PUT request', async () => {
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

    await putItem({id: updatedItem.id, text: updatedItem.text})(dispatch);

    expect(dispatch.mock.calls[0][0]).toEqual(updateItemName);
    expect(dispatch.mock.calls[1][0]).toEqual(putSuccessName);
  });

  it('dispatches PUT_ITEM_SUCCESS with correct arguments after successful PUT request', async () => {
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

    await putItem({id: updatedItem.id, text: updatedItem.text})(dispatch);

    expect(putSuccess.mock.calls[0][0]).toEqual(updatedItem.id);
  });

  it('dispatches TODO_LIST_ITEM_UPDATE, PUT_ITEM_ERROR after unsuccessful PUT request', async () => {
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

    await putItem({id: updatedItem.id, text: updatedItem.text})(dispatch);

    expect(dispatch.mock.calls[0][0]).toEqual(updateItemName);
    expect(dispatch.mock.calls[1][0]).toEqual(putErrorName);
    expect(putError.mock.calls[0][0]).toEqual({
      id: updatedItem.id,
      message: errorMessage
    });
  });
});
