import { deleteItemFactory } from './deleteItemFactory';
import { actionTypes } from '../../constants/actionTypes';

describe('deleteItemFactory works correctly', () => {
  const dispatchMock = jest.fn();

  it('dispatch success on deleteItem resolve with correct data', () => {
    const deleteItemMock = jest.fn(() => Promise.resolve());
    const factory = deleteItemFactory(deleteItemMock);

    const result = factory('x')(dispatchMock, { } as any, {});

    return result.then(() => {
      expect(deleteItemMock.mock.calls.length).toBe(1);
      expect(dispatchMock.mock.calls.length).toBe(2);
      expect(dispatchMock.mock.calls[0][0].type).toBe(actionTypes.ITEM_DELETE_OPTIMISTIC);
      expect(dispatchMock.mock.calls[1][0].type).toBe(actionTypes.ITEM_DELETE_SUCCESS);
    });
  });

  it('dispatch error on deleteItem reject with correct error', () => {
    const deleteItemMock = jest.fn(() => Promise.reject(''));
    const factory = deleteItemFactory(deleteItemMock);

    const result = factory('x')(dispatchMock, { } as any, {});

    return result.catch(() => {
      expect(deleteItemMock.mock.calls.length).toBe(1);
      expect(dispatchMock.mock.calls.length).toBe(2);
      expect(dispatchMock.mock.calls[0][0].type).toBe(actionTypes.ITEM_DELETE_OPTIMISTIC);
      expect(dispatchMock.mock.calls[1][0].type).toBe(actionTypes.ITEM_DELETE_FAILED);
    });
  });
});
