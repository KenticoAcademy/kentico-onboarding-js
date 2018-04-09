import { IItemsApiService } from '../../services/itemsApiService';
import { Key } from '../../@types/Key';
import { IState } from '../../store/IState';
import { IServerItem } from '../../models/IServerItem';
import { deleteItemFactory } from './deleteItemFactory';
import { actionTypes } from '../../constants/actionTypes';

describe('deleteItemFactory works correctly', () => {

  class DummyApiService implements IItemsApiService {
    getItems: () => Promise<Array<IServerItem>>;
    postItem: (itemValue: string) => Promise<IServerItem>;
    putItem: (key: Key, itemValue: string) => Promise<Response>;
    deleteItem: (key: Key) => Promise<Response>;

    constructor(deleteItemMock: (key: Key) => Promise<Response>) {
      this.deleteItem = deleteItemMock;
    }
  }

  class DummyState implements IState {
    list: any;
  }
  const dispatchMock = jest.fn();

  it('dispatch success on deleteItem resolve with correct data', () => {
    const deleteItemMock = jest.fn(() => Promise.resolve());
    const factory = deleteItemFactory(new DummyApiService(deleteItemMock));

    const result = factory('x')(dispatchMock, () => new DummyState(), {});

    return result.then(() => {
      expect(deleteItemMock.mock.calls.length).toBe(1);
      expect(dispatchMock.mock.calls.length).toBe(1);
      expect(dispatchMock.mock.calls[0][0].type).toBe(actionTypes.ITEM_DELETE_SUCCESS);
    });
  });

  it('dispatch error on deleteItem reject with correct error', () => {
    const deleteItemMock = jest.fn(() => Promise.reject(''));
    const factory = deleteItemFactory(new DummyApiService(deleteItemMock));

    const result = factory('x')(dispatchMock, () => new DummyState(), {});

    return result.catch(() => {
      expect(deleteItemMock.mock.calls.length).toBe(1);
      expect(dispatchMock.mock.calls.length).toBe(1);
      expect(dispatchMock.mock.calls[0][0].type).toBe(actionTypes.ITEM_DELETE_FAILED);
    });
  });
});
