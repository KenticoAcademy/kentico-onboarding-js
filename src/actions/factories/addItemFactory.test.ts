import { Promise } from 'es6-promise';

import { IItemsApiService } from '../../services/itemsApiService';
import { Key } from '../../@types/Key';
import { IState } from '../../store/IState';
import { IServerItem } from '../../models/IServerItem';
import { addItemFactory } from './addItemFactory';
import { actionTypes } from '../../constants/actionTypes';

describe('addItemFactory works correctly', () => {

  class DummyApiService implements IItemsApiService {
    getItems: () => Promise<Array<IServerItem>>;
    getItem: (key: Key) => Promise<Response>;
    postItem: (itemValue: string) => Promise<IServerItem>;
    putItem: (key: Key, itemValue: string) => Promise<Response>;
    deleteItem: (key: Key) => Promise<Response>;

    constructor(postItemMock: (itemValue: string) => Promise<IServerItem>) {
      this.postItem = postItemMock;
    }
  }

  class DummyState implements IState {
    list: any;
  }
  const dispatchMock = jest.fn();

  it('dispatch success on postItem resolve with correct data', () => {
    const itemText = 'x text';
    const itemResolved = {key: 'x', text: itemText};
    const postItemMock = jest.fn(() => Promise.resolve(itemResolved));
    const factory = addItemFactory(new DummyApiService(postItemMock));

    const result = factory(itemText)(dispatchMock, () => new DummyState(), {});

    result.then(items => {
      expect(postItemMock.mock.calls).toBe(1);
      expect(dispatchMock.mock.calls).toBe(1);
      expect(dispatchMock.mock.calls[0][0].type).toBe(actionTypes.ITEM_ADD_SUCCESS);
      expect(items).toBe(itemResolved);
    });
  });

  it('dispatch error on postItem reject with correct error', () => {
    const errorMessage = 'x error';
    const postItemMock = jest.fn(() => Promise.reject(errorMessage));
    const factory = addItemFactory(new DummyApiService(postItemMock));

    const result = factory('')(dispatchMock, () => new DummyState(), {});

    result.catch(error => {
      expect(postItemMock.mock.calls).toBe(1);
      expect(dispatchMock.mock.calls).toBe(1);
      expect(dispatchMock.mock.calls[0][0].type).toBe(actionTypes.ITEM_ADD_FAILED);
      expect(error).toBe(errorMessage);
    });
  });
});
