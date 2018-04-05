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

  it('dispatch success on resolve', () => {
    const getItemsMoc = jest.fn(() => Promise.resolve());
    const factory = getItemsFactory(new DummyApiService(getItemsMoc), successMock, failureMock);

    const result = factory()(dispatchMock, () => new DummyState(), {});

    result.then(() => expect(dispatchMock.mock.calls).toBe(1));
  });

  it('dispatch error on reject', () => {
    const getItemsMoc = jest.fn(() => Promise.reject('x'));
    const factory = getItemsFactory(new DummyApiService(getItemsMoc), successMock, failureMock);

    const result = factory()(dispatchMock, () => new DummyState(), {});

    result.catch(() => expect(dispatchMock.mock.calls).toBe(1));
  });
});
