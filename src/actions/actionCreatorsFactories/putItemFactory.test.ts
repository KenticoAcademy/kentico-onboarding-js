import { putItemFactory } from './putItemFactory';
import { Uuid } from '../../utils/generateId';
import { ITEM_UPDATE_FAILED, ITEM_UPDATE_SUCCEEDED, TODO_LIST_ITEM_UPDATE } from '../../constants/actionTypes';

const dispatch = jest.fn(input => input);

beforeEach(() => {
  dispatch.mock.calls.length = 0;
});

describe('put item tests', () => {
  it('dispatches TODO_LIST_ITEM_UPDATE, ITEM_UPDATE_SUCCEEDED after successful PUT request', async () => {
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
      axiosPut
    });
    const updateItem = {
      type: TODO_LIST_ITEM_UPDATE,
      payload: updatedItem
    };
    const putSucceeded = {
      type: ITEM_UPDATE_SUCCEEDED,
      payload: {
        id: updatedItem.id
      }
    };

    await putItem({id: updatedItem.id, text: updatedItem.text})(dispatch);

    expect(dispatch.mock.calls[0][0]).toEqual(updateItem);
    expect(dispatch.mock.calls[1][0]).toEqual(putSucceeded);
  });

  it('dispatches TODO_LIST_ITEM_UPDATE, ITEM_UPDATE_FAILED after unsuccessful PUT request', async () => {
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
      axiosPut
    });
    const updateItem = {
      type: TODO_LIST_ITEM_UPDATE,
      payload: updatedItem
    };
    const putFailed = {
      type: ITEM_UPDATE_FAILED,
      payload: {
        id: updatedItem.id,
        message: errorMessage,
      }
    };

    await putItem(updatedItem)(dispatch);

    expect(dispatch.mock.calls[0][0]).toEqual(updateItem);
    expect(dispatch.mock.calls[1][0]).toEqual(putFailed);
  });
});
