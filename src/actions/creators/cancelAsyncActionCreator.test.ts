import Mock = jest.Mock;
import { OrderedMap } from 'immutable';
import { Item } from '../../models/Item';
import { ItemError } from '../../models/Error';
import {
  CancelItemUpdatingAction,
  DeleteItemErrorAction,
  DeleteItemSuccessAction,
} from '../types/itemsActionTypes';
import { cancelItemUpdating, deleteItemError, deleteItemSuccess } from '../itemsActions';
import { cancelAsyncActionCreator } from './cancelAsyncActionCreator';

describe('cancelAsyncActionCreator', () => {
  let dispatch: Mock;
  let getState: Mock;

  beforeEach(() => {
    dispatch = jest.fn();
  });

  it('when canceling POST, creates deleteItemSuccess action', async () => {
    const id: Guid = '1';
    const errorId: Guid = '42';
    const expectedAction1: DeleteItemErrorAction = deleteItemError(errorId);
    const expectedAction2: DeleteItemSuccessAction = deleteItemSuccess(id);

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
              action: 'POST',
            }),
          ],
        ]),
      },
    }));

    cancelAsyncActionCreator(id)(dispatch, getState);

    expect(dispatch.mock.calls.length).toBe(2);
    expect(dispatch.mock.calls[0][0]).toEqual(expectedAction1);
    expect(dispatch.mock.calls[1][0]).toEqual(expectedAction2);
  });

  it('when canceling POST, creates deleteItemSuccess action', async () => {
    const id: Guid = '1';
    const errorId: Guid = '42';
    const expectedAction1: DeleteItemErrorAction = deleteItemError(errorId);
    const expectedAction2: DeleteItemSuccessAction = deleteItemSuccess(id);

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
              action: 'POST',
            }),
          ],
        ]),
      },
    }));

    cancelAsyncActionCreator(id)(dispatch, getState);

    expect(dispatch.mock.calls.length).toBe(2);
    expect(dispatch.mock.calls[0][0]).toEqual(expectedAction1);
    expect(dispatch.mock.calls[1][0]).toEqual(expectedAction2);
  });

  it('when canceling PUT, creates cancelItemUpdating action', async () => {
    const id: Guid = '1';
    const errorId: Guid = '42';
    const expectedAction1: DeleteItemErrorAction = deleteItemError(errorId);
    const expectedAction2: CancelItemUpdatingAction = cancelItemUpdating(id);

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
              action: 'PUT',
            }),
          ],
        ]),
      },
    }));

    cancelAsyncActionCreator(id)(dispatch, getState);

    expect(dispatch.mock.calls.length).toBe(2);
    expect(dispatch.mock.calls[0][0]).toEqual(expectedAction1);
    expect(dispatch.mock.calls[1][0]).toEqual(expectedAction2);
  });

  it('when canceling DELETE, creates deleteItemError action', async () => {
    const id: Guid = '1';
    const errorId: Guid = '42';
    const expectedAction1: DeleteItemErrorAction = deleteItemError(errorId);

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

    cancelAsyncActionCreator(id)(dispatch, getState);

    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual(expectedAction1);
  });
});
