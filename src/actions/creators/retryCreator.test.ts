import { OrderedMap } from 'immutable';
import { Item } from '../../models/Item';
import { ItemError } from '../../models/Error';
import {
  DeleteItemErrorAction, DeleteItemSuccessAction,
} from '../types/itemsActionTypes';
import { deleteItemError, deleteItemSuccess } from '../itemsActions';
import { retryCreator } from './retryCreator';
import Mock = jest.Mock;

describe('retryCreator', () => {
  const errorIdGenerator = () => '42';
  let dispatch: Mock;
  let deleteItemRequest: Mock;
  let postItemRequest: Mock;
  let putItemRequest: Mock;
  let getState: Mock;

  beforeEach(() => {
    dispatch = jest.fn();
    deleteItemRequest = jest.fn();
    postItemRequest = jest.fn();
    putItemRequest = jest.fn();
  });

  it('when retrying DELETE, creates deleteItemCreator action', async () => {
    const id: Guid = '1';
    const errorId: Guid = errorIdGenerator();
    const expectedAction: DeleteItemErrorAction = deleteItemError(errorId);

    getState = jest.fn(() => ({
      list: {
        items: OrderedMap([
          [
            id,
            new Item({
              id,
              text: 'Learn JS',
              errorId,
            }),
          ],
        ]),
        itemErrors: OrderedMap([
          [
            errorId,
            new ItemError({
              id: errorId,
              message: 'Error2',
              action: 'DELETE',
            }),
          ],
        ]),
      },
    }));

    await retryCreator(deleteItemRequest, postItemRequest, putItemRequest)(id)(dispatch, getState);

    expect(dispatch.mock.calls.length).toBe(2);
    expect(dispatch.mock.calls[0][0]).toEqual(expectedAction);

    expect(deleteItemRequest.mock.calls.length).toBe(1);
    expect(deleteItemRequest.mock.calls[0][0]).toEqual(id);

    expect(postItemRequest.mock.calls.length).toBe(0);
    expect(putItemRequest.mock.calls.length).toBe(0);
  });

  it('when retrying POST, creates postItemCreator action', async () => {
    const id: Guid = '1';
    const text: string = 'Learn JS';
    const errorId: Guid = errorIdGenerator();
    const expectedAction1: DeleteItemErrorAction = deleteItemError(errorId);
    const expectedAction2: DeleteItemSuccessAction = deleteItemSuccess(id, errorId);

    getState = jest.fn(() => ({
      list: {
        items: OrderedMap([
          [
            id,
            new Item({
              id,
              text,
              errorId,
            }),
          ],
        ]),
        itemErrors: OrderedMap([
          [
            errorId,
            new ItemError({
              id: errorId,
              message: 'Error2',
              action: 'POST',
            }),
          ],
        ]),
      },
    }));

    await retryCreator(deleteItemRequest, postItemRequest, putItemRequest)(id)(dispatch, getState);

    expect(dispatch.mock.calls.length).toBe(3);
    expect(dispatch.mock.calls[0][0]).toEqual(expectedAction1);
    expect(dispatch.mock.calls[1][0]).toEqual(expectedAction2);

    expect(postItemRequest.mock.calls.length).toBe(1);
    expect(postItemRequest.mock.calls[0][0]).toEqual(text);

    expect(deleteItemRequest.mock.calls.length).toBe(0);
    expect(putItemRequest.mock.calls.length).toBe(0);
  });

  it('when retrying PUT, creates putItemCreator action', async () => {
    const id: Guid = '1';
    const errorId: Guid = errorIdGenerator();
    const item = new Item({
      id,
      text: 'Learn JS',
      errorId,
    });
    const expectedAction: DeleteItemErrorAction = deleteItemError(errorId);

    getState = jest.fn(() => ({
      list: {
        items: OrderedMap([
          [
            id,
            item,
          ],
        ]),
        itemErrors: OrderedMap([
          [
            errorId,
            new ItemError({
              id: errorId,
              message: 'Error2',
              action: 'PUT',
            }),
          ],
        ]),
      },
    }));

    await retryCreator(deleteItemRequest, postItemRequest, putItemRequest)(id)(dispatch, getState);

    expect(dispatch.mock.calls.length).toBe(2);
    expect(dispatch.mock.calls[0][0]).toEqual(expectedAction);

    expect(putItemRequest.mock.calls.length).toBe(1);
    expect(putItemRequest.mock.calls[0][0]).toEqual(item);

    expect(postItemRequest.mock.calls.length).toBe(0);
    expect(deleteItemRequest.mock.calls.length).toBe(0);
  });
});
