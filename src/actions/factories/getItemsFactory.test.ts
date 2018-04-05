import { Promise } from 'es6-promise';

import { getItemsFactory } from './getItemsFactory';
import { IItemsApiService } from '../../services/itemsApiService';
import { Key } from '../../@types/Key';
import { IState } from '../../store/IState';
import { IServerItem } from '../../models/IServerItem';

describe('getItemsFactory works correctly', () => {

  class DummyApiService implements IItemsApiService {
    getItems: () => Promise<Array<IServerItem>>;
    getItem: (key: Key) => Promise<Response>;
    postItem: (itemValue: string) => Promise<Response>;
    putItem: (key: Key, itemValue: string) => Promise<Response>;
    deleteItem: (key: Key) => Promise<Response>;

    constructor(getItemsMock: () => Promise<Array<IServerItem>>) {
      this.getItems = getItemsMock;
    }
  }

  class DummyState implements IState {
    list: any;
  }
  const dispatchMock = jest.fn();
  const successMock = jest.fn();
  const failureMock = jest.fn();

  it('dispatch success on getItems resolve with correct data', () => {
    const itemsResolved = [1, 2, 4];
    const getItemsMock = jest.fn(() => Promise.resolve(itemsResolved));
    const factory = getItemsFactory(new DummyApiService(getItemsMock), successMock, failureMock);

    const result = factory()(dispatchMock, () => new DummyState(), {});

    result.then(items => {
      expect(getItemsMock.mock.calls).toBe(1);
      expect(dispatchMock.mock.calls).toBe(1);
      expect(items).toBe(itemsResolved);
    });
  });

  it('dispatch error on getItems reject with correct error', () => {
    const errorMessage = 'x error';
    const getItemsMock = jest.fn(() => Promise.reject(errorMessage));
    const factory = getItemsFactory(new DummyApiService(getItemsMock), successMock, failureMock);

    const result = factory()(dispatchMock, () => new DummyState(), {});

    result.catch(error => {
      expect(getItemsMock.mock.calls).toBe(1);
      expect(dispatchMock.mock.calls).toBe(1);
      expect(error).toBe(errorMessage);
    });
  });
});
