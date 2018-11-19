import { OrderedMap } from 'immutable';
import { Item } from '../../models/Item';
import { ItemError } from '../../models/Error';
import { DeleteItemErrorAction } from '../types/itemsActionTypes';
import { deleteItemError } from '../itemsActions';
import { retryThunkActionFactory } from './retryThunkActionFactory';
import Mock = jest.Mock;
import { ErrorAction } from '../types/ErrorAction';

describe('retryThunkActionFactory', () => {
  const generateErrorId = () => '42';
  let dispatch: Mock;
  let deleteItemRequest: Mock;
  let repostItemRequest: Mock;
  let putItemRequest: Mock;
  let getState: Mock;

  beforeEach(() => {
    dispatch = jest.fn();
    deleteItemRequest = jest.fn();
    repostItemRequest = jest.fn();
    putItemRequest = jest.fn();
  });

  it('when retrying DELETE, creates deleteItemFactory action', async () => {
    const id: Guid = '1';
    const errorId: Guid = generateErrorId();
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
              action: ErrorAction.Delete,
            }),
          ],
        ]),
      },
    }));
    const retryThunkAction = retryThunkActionFactory({ deleteItemThunk: deleteItemRequest, repostItemThunk: repostItemRequest, putItemThunk: putItemRequest });
    const dispatchable = retryThunkAction(id);

    await dispatchable(dispatch, getState, undefined);

    expect(dispatch.mock.calls.length).toBe(2);
    expect(dispatch.mock.calls[0][0]).toEqual(expectedAction);

    expect(deleteItemRequest.mock.calls.length).toBe(1);
    expect(deleteItemRequest.mock.calls[0][0]).toEqual(id);

    expect(repostItemRequest.mock.calls.length).toBe(0);
    expect(putItemRequest.mock.calls.length).toBe(0);
  });

  it('when retrying POST, creates repostItemFactory action', async () => {
    const id: Guid = '1';
    const text: string = 'Learn JS';
    const errorId: Guid = generateErrorId();
    const expectedAction1: DeleteItemErrorAction = deleteItemError(errorId);
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
              action: ErrorAction.Add,
            }),
          ],
        ]),
      },
    }));
    const retryThunkAction = retryThunkActionFactory({ deleteItemThunk: deleteItemRequest, repostItemThunk: repostItemRequest, putItemThunk: putItemRequest });
    const dispatchable = retryThunkAction(id);

    await dispatchable(dispatch, getState, undefined);

    expect(dispatch.mock.calls.length).toBe(2);
    expect(dispatch.mock.calls[0][0]).toEqual(expectedAction1);

    expect(repostItemRequest.mock.calls.length).toBe(1);
    expect(repostItemRequest.mock.calls[0][0]).toEqual(id);
    expect(repostItemRequest.mock.calls[0][1]).toEqual(text);

    expect(deleteItemRequest.mock.calls.length).toBe(0);
    expect(putItemRequest.mock.calls.length).toBe(0);
  });

  it('when retrying PUT, creates putItemFactory action', async () => {
    const id: Guid = '1';
    const errorId: Guid = generateErrorId();
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
              action: ErrorAction.Update,
            }),
          ],
        ]),
      },
    }));
    const retryThunkAction = retryThunkActionFactory({ deleteItemThunk: deleteItemRequest, repostItemThunk: repostItemRequest, putItemThunk: putItemRequest });
    const dispatchable = retryThunkAction(id);

    await dispatchable(dispatch, getState, undefined);

    expect(dispatch.mock.calls.length).toBe(2);
    expect(dispatch.mock.calls[0][0]).toEqual(expectedAction);

    expect(putItemRequest.mock.calls.length).toBe(1);
    expect(putItemRequest.mock.calls[0][0]).toEqual(item.id);
    expect(putItemRequest.mock.calls[0][1]).toEqual(item.text);

    expect(repostItemRequest.mock.calls.length).toBe(0);
    expect(deleteItemRequest.mock.calls.length).toBe(0);
  });
});
