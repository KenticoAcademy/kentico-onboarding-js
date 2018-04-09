import { Key } from '../../@types/Key';
import { IListStore, IState } from '../../store/IState';
import { deleteSelectedItemsFactory } from './deleteSelectedItemsFactory';
import { actionTypes } from '../../constants/actionTypes';
import { OrderedMap } from 'immutable';
import { Item } from '../../models/Item';

describe('saveItemFactory works correctly', () => {
  const dummyList = (items: OrderedMap<Key, Item>): IListStore => ({
    items: items,
    error: { } as any,
    groupActionsEnabled: true,
  });
  class DummyState implements IState {
    constructor(public list: IListStore) { }
  }
  const dispatchMock = jest.fn();

  it('dispatch of ITEMS_GROUP_ACTIONS_TOGGLE is called twice', () => {
    const factory = deleteSelectedItemsFactory({ } as any);
    const result = factory([])(dispatchMock, { } as any, {});

    return result.then(() => {
      expect(dispatchMock.mock.calls.length).toBe(2);
      expect(dispatchMock.mock.calls[0][0].type).toBe(actionTypes.ITEMS_GROUP_ACTIONS_TOGGLE);
    });
  });

  it('dispatch success on putItem resolves correctly two times', () => {
    const deleteItemMock = jest.fn(() => Promise.resolve());
    const factory = deleteSelectedItemsFactory(deleteItemMock);
    const items = OrderedMap<Key, Item>()
      .set('x', new Item({temporaryValue: 'XXX'}))
      .set('y', new Item({temporaryValue: 'YYY'}));

    const result = factory(['x', 'y'])(dispatchMock, () => new DummyState(dummyList(items)), {});

    return result.then(() => {
      const savedCalled = dispatchMock.mock.calls.filter(x => x[0].type === actionTypes.ITEM_DELETE_SUCCESS);

      expect(deleteItemMock.mock.calls.length).toBe(2);
      expect(savedCalled.length).toBe(2);
    });
  });

  it('dispatch error on putItem resolves correctly two times', () => {
    const deleteItemMock = jest.fn(() => Promise.reject(''));
    const factory = deleteSelectedItemsFactory(deleteItemMock);
    const items = OrderedMap<Key, Item>()
      .set('x', new Item({temporaryValue: 'XXX'}))
      .set('y', new Item({temporaryValue: 'YYY'}));

    const result = factory(['x', 'y'])(dispatchMock, () => new DummyState(dummyList(items)), {});

    return result.then(() => {
      const failedCalled = dispatchMock.mock.calls.filter(x => x[0].type === actionTypes.ITEM_DELETE_FAILED);

      expect(deleteItemMock.mock.calls.length).toBe(2);
      expect(failedCalled.length).toBe(2);
    });
  });
});
