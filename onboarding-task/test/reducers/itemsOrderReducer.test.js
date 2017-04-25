import * as Immutable from 'immutable';

import { deleteItem } from '../../src/actions/actionCreators';
import { itemsOrderReducer } from '../../src/reducers/itemsOrderReducer';
import { createItemFactory } from '../../src/actions/createItemFactory';

describe('itemsOrderReducer', () => {
  const id = 'da5cbf5f-2d20-4945-b8d2-4cc3b6be1542';
  const stateWithItem = Immutable.OrderedSet().add(id);
  const unknownAction = { type: 'unknown action' };

  it('delete item with given id', () => {
    const actualState = itemsOrderReducer(stateWithItem, deleteItem(id));

    expect(actualState !== stateWithItem).toBeTruthy();
    expect(actualState.has(id)).toBeFalsy();
  });

  it('create item in itemsOrder', () => {
    const ueid = '2235d270-3918-48d9-95f7-a1b0ef008126';
    const createItem = createItemFactory(() => ueid);

    const actualState = itemsOrderReducer(undefined, createItem('value'));

    expect(actualState.has(ueid)).toBeTruthy();
  });

  it('unknown action passed to reducer returns previous state', () => {
    const actualState = itemsOrderReducer(stateWithItem, unknownAction);

    expect(actualState).toEqual(stateWithItem);
    expect(actualState.has(id)).toBeTruthy();
  });

  it('send undefined state, initializes default state correctly', () => {
    const actualState = itemsOrderReducer(undefined, unknownAction);

    expect(actualState).toEqual(Immutable.OrderedSet());
  });
});
