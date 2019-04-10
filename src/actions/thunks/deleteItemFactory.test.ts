import { deleteItemFactory } from './deleteItemFactory';
import {
  ITEM_DELETE_FAILED,
  ITEM_DELETE_STARTED,
  ITEM_DELETE_SUCCEEDED,
} from '../types/listActionTypes';
import { Dispatch } from '../types/Dispatcher';
import Mock = jest.Mock;

describe('Delete item', () => {
  const dispatch: Mock<Dispatch> = jest.fn();
  const itemId = '00000000-0000-0000-0000-000000000001';
  const successfullyDelete = jest.fn(() => Promise.resolve());
  const unsuccessfullyDelete = jest.fn(() => Promise.reject(new Error('Invalid response.')));

  beforeEach(() => {
    dispatch.mockClear();
  });

  it('dispatches request and success actions if the fetch response was successful', async () => {
    const deleteItem = deleteItemFactory({removeItem: successfullyDelete});
    const dispatchable = deleteItem(itemId);

    await dispatchable(dispatch);

    expect(dispatch.mock.calls.length).toBe(2);
    expect(dispatch.mock.calls[0][0].type).toEqual(ITEM_DELETE_STARTED);
    expect(dispatch.mock.calls[1][0].type).toEqual(ITEM_DELETE_SUCCEEDED);

  });

  it('dispatches request and fail actions if the fetch response failed', async () => {
    const deleteItem = deleteItemFactory({removeItem: unsuccessfullyDelete});
    const dispatchable = deleteItem(itemId);

    await dispatchable(dispatch);

    expect(dispatch.mock.calls.length).toBe(2);
    expect(dispatch.mock.calls[0][0].type).toEqual(ITEM_DELETE_STARTED);
    expect(dispatch.mock.calls[1][0].type).toEqual(ITEM_DELETE_FAILED);
  });
});
