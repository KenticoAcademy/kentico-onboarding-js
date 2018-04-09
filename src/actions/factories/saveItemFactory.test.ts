import { IItemsApiService } from '../../services/itemsApiService';
import { Key } from '../../@types/Key';
import { IState } from '../../store/IState';
import { IServerItem } from '../../models/IServerItem';
import { saveItemFactory } from './saveItemFactory';
import { actionTypes } from '../../constants/actionTypes';

describe('saveItemFactory works correctly', () => {

  class DummyApiService implements IItemsApiService {
    getItems: () => Promise<Array<IServerItem>>;
    postItem: (itemValue: string) => Promise<IServerItem>;
    putItem: (key: Key, itemValue: string) => Promise<Response>;
    deleteItem: (key: Key) => Promise<Response>;

    constructor(putItemMock: (key: Key, itemValue: string) => Promise<Response>) {
      this.putItem = putItemMock;
    }
  }

  class DummyState implements IState {
    list: any;
  }
  const dispatchMock = jest.fn();

  it('dispatch success on putItem resolve with correct data', () => {
    const itemText = 'x text';
    const key = 'x';
    const serverItem = { id: 'x', text: itemText };
    const putItemMock = jest.fn(() => Promise.resolve(serverItem));
    const factory = saveItemFactory(new DummyApiService(putItemMock));

    const result = factory(key, itemText)(dispatchMock, () => new DummyState(), {});

    return result.then(() => {
      expect(putItemMock.mock.calls.length).toBe(1);
      expect(dispatchMock.mock.calls.length).toBe(1);
      expect(dispatchMock.mock.calls[0][0].type).toBe(actionTypes.ITEM_SAVE_SUCCESS);
    });
  });

  it('dispatch error on putItem reject with correct error', () => {
    const putItemMock = jest.fn(() => Promise.reject(''));
    const factory = saveItemFactory(new DummyApiService(putItemMock));

    const result = factory('x', '')(dispatchMock, () => new DummyState(), {});

    return result.catch(() => {
      expect(putItemMock.mock.calls.length).toBe(1);
      expect(dispatchMock.mock.calls.length).toBe(1);
      expect(dispatchMock.mock.calls[0][0].type).toBe(actionTypes.ITEM_SAVE_FAILED);
    });
  });
});
