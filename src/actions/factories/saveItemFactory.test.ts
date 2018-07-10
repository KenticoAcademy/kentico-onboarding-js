import { saveItemFactory } from './saveItemFactory';
import { actionTypes } from '../../constants/actionTypes';

describe('saveItemFactory works correctly', () => {
  const dispatchMock = jest.fn();

  it('dispatch success on putItem resolve with correct data', () => {
    const itemText = 'x text';
    const key = 'x';
    const serverItem = { id: 'x', text: itemText };
    const putItemMock = jest.fn(() => Promise.resolve(serverItem));
    const factory = saveItemFactory(putItemMock);

    const result = factory(key, itemText)(dispatchMock, { } as any, {});

    return result.then(() => {
      expect(putItemMock.mock.calls.length).toBe(1);
      expect(dispatchMock.mock.calls.length).toBe(2);
      expect(dispatchMock.mock.calls[0][0].type).toBe(actionTypes.ITEM_SAVE_OPTIMISTIC);
      expect(dispatchMock.mock.calls[1][0].type).toBe(actionTypes.ITEM_SAVE_SUCCESS);
    });
  });

  it('dispatch error on putItem reject with correct error', () => {
    const putItemMock = jest.fn(() => Promise.reject(''));
    const factory = saveItemFactory(putItemMock);

    const result = factory('x', '')(dispatchMock, { } as any, {});

    return result.then(() => {
      expect(putItemMock.mock.calls.length).toBe(1);
      expect(dispatchMock.mock.calls.length).toBe(2);
      expect(dispatchMock.mock.calls[0][0].type).toBe(actionTypes.ITEM_SAVE_OPTIMISTIC);
      expect(dispatchMock.mock.calls[1][0].type).toBe(actionTypes.ITEM_SAVE_FAILED);
    });
  });
});
