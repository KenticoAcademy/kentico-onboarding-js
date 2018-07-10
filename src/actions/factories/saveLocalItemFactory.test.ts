import { saveLocalItemFactory } from './saveLocalItemFactory';
import { actionTypes } from '../../constants/actionTypes';

describe('saveLocalItemFactory works correctly', () => {
  const localKey = 'key';
  const itemText = 'x text';
  const dispatchMock = jest.fn();

  it('dispatch success on postItem resolve with correct data', () => {
    const serverItem = { id: 'x', text: itemText };
    const postItemMock = jest.fn(() => Promise.resolve(serverItem));
    const factory = saveLocalItemFactory(postItemMock);

    const result = factory(localKey, itemText)(dispatchMock, { } as any, {});

    return result.then(() => {
      expect(postItemMock.mock.calls.length).toBe(1);
      expect(dispatchMock.mock.calls.length).toBe(3);
      expect(dispatchMock.mock.calls[0][0].type).toBe(actionTypes.ITEM_SAVE_OPTIMISTIC);
      expect(dispatchMock.mock.calls[1][0].type).toBe(actionTypes.ITEM_DELETE_OPTIMISTIC);
      expect(dispatchMock.mock.calls[2][0].type).toBe(actionTypes.ITEM_ADD_SUCCESS);
    });
  });

  it('dispatch error on postItem reject with correct error', () => {
    const postItemMock = jest.fn(() => Promise.reject(''));
    const factory = saveLocalItemFactory(postItemMock);

    const result = factory(localKey, itemText)(dispatchMock, { } as any, {});

    return result.then(() => {
      expect(postItemMock.mock.calls.length).toBe(1);
      expect(dispatchMock.mock.calls.length).toBe(2);
      expect(dispatchMock.mock.calls[0][0].type).toBe(actionTypes.ITEM_SAVE_OPTIMISTIC);
      expect(dispatchMock.mock.calls[1][0].type).toBe(actionTypes.ITEM_ADD_FAILED);
    });
  });
});
