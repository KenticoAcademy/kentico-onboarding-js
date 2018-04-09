import { getItemsFactory } from './getItemsFactory';
import { IItemsApiService } from '../../services/itemsApiService';
import { Key } from '../../@types/Key';
import { IState } from '../../store/IState';
import { IServerItem } from '../../models/IServerItem';
import { actionTypes } from '../../constants/actionTypes';

describe('getItemsFactory works correctly', () => {

  class DummyApiService implements IItemsApiService {
    getItems: () => Promise<Array<IServerItem>>;
    postItem: (itemValue: string) => Promise<IServerItem>;
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

  it('dispatch success on getItems resolve with correct data', () => {
    const itemText = 'x text';
    const serverItem = { id: 'x', text: itemText };
    const getItemsMock = jest.fn(() => Promise.resolve([serverItem]));
    const factory = getItemsFactory(new DummyApiService(getItemsMock));

    const result = factory()(dispatchMock, () => new DummyState(), {});


    return result.then(() => {
      expect(getItemsMock.mock.calls.length).toBe(1);
      expect(dispatchMock.mock.calls.length).toBe(1);
      expect(dispatchMock.mock.calls[0][0].type).toBe(actionTypes.ITEMS_GET_SUCCESS);
    });
  });

  it('dispatch error on getItems reject with correct error', () => {
    const getItemsMock = jest.fn(() => Promise.reject(''));
    const factory = getItemsFactory(new DummyApiService(getItemsMock));

    const result = factory()(dispatchMock, () => new DummyState(), {});

    return result.catch(() => {
      expect(getItemsMock.mock.calls.length).toBe(1);
      expect(dispatchMock.mock.calls.length).toBe(1);
      expect(dispatchMock.mock.calls[0][0].type).toBe(actionTypes.ITEMS_GET_FAILED);
    });
  });
});
