import { Dispatch } from '../types/Dispatcher';
import { OrderedMap } from 'immutable';
import { ListItem } from '../../models/ListItem';
import { ListError } from '../../models/ListError';
import { retryFactory } from './retryFactory';
import { ErrorType } from '../../models/ErrorType';
import Mock = jest.Mock;

describe('Retry', () => {
  const itemId = '00000000-0000-0000-0000-000000000001';
  const errorIds = {errorId: '00000000-0000-0000-0000-000000000002', itemId};
  const dispatch: Mock<Dispatch> = jest.fn();
  const getState = jest.fn(() => ({
    items: OrderedMap<Uuid, ListItem>()
      .set(
        itemId,
        new ListItem({id: itemId})),
  }));
  const postItem = jest.fn();
  const deleteItem = jest.fn();
  const putItem = jest.fn();
  const retry = retryFactory({postItem, deleteItem, putItem});

  beforeEach(() => {
    dispatch.mockClear();
    postItem.mockClear();
    deleteItem.mockClear();
    putItem.mockClear();
  });

  it('calls post add item when passing error with failed add', () => {
    const addFailError = new ListError({
      ...errorIds,
      action: ErrorType.ADD,
    });

    retry(addFailError)(dispatch, getState);

    expect(dispatch.mock.calls.length).toBe(1);
    expect(postItem.mock.calls.length).toBe(1);

  });

  it('calls delete item when passing error with failed delete', () => {
    const deleteFailError = new ListError({
      ...errorIds,
      action: ErrorType.DELETE,
    });

    retry(deleteFailError)(dispatch, getState);

    expect(dispatch.mock.calls.length).toBe(1);
    expect(deleteItem.mock.calls.length).toBe(1);
  });

  it('calls put item when passing error with failed save', () => {
    const saveFailError = new ListError({
      ...errorIds,
      action: ErrorType.SAVE,
    });

    retry(saveFailError)(dispatch, getState);

    expect(dispatch.mock.calls.length).toBe(1);
    expect(putItem.mock.calls.length).toBe(1);
  });

  it('throws error when passing error with other actions', () => {
    const defaultErrorType = new ListError({
      ...errorIds,
      action: ErrorType.DEFAULT,
    });

    expect(() => retry(defaultErrorType)(dispatch, getState))
      .toThrow('Invalid action was dispatched.');
  });
});
