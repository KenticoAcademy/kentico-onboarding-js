import * as Immutable from 'immutable';

import { deleteItem } from '../../src/actions/actionCreators';
import { itemsOrderReducer } from '../../src/reducers/itemsOrderReducer';
import { createItemFactory } from '../../src/actions/createItemFactory';

describe('itemsOrderReducer', () => {
  it('delete item for given id', () => {
    const id = 'da5cbf5f-2d20-4945-b8d2-4cc3b6be1542';
    const sentState = Immutable.OrderedSet().add(id);

    const actualState = itemsOrderReducer(sentState, deleteItem(id));

    expect(actualState !== sentState).toBeTruthy();
    expect(actualState.has(id)).toBeFalsy();
  });

  it('create item for given id', () => {
    const id = 'da5cbf5f-2d20-4945-b8d2-4cc3b6be1542';
    const createItem = createItemFactory(() => id);
    const sentState = Immutable.OrderedSet();

    const actualState = itemsOrderReducer(sentState, createItem('value'));

    expect(actualState.has(id)).toBeTruthy();
  });

  it('unknown action passed to reducer returns previous state', () => {
    const id = 'da5cbf5f-2d20-4945-b8d2-4cc3b6be1542';
    const expectedState = Immutable.OrderedSet().add(id);

    let action = deleteItem(id);
    action.type = 'unknown action';
    const actualState = itemsOrderReducer(expectedState, action);

    expect(actualState).toEqual(expectedState);
    expect(actualState.has(id)).toBeTruthy();
  });

  it('send undefined state, initializes state correctly', () => {
    const id = 'da5cbf5f-2d20-4945-b8d2-4cc3b6be1542';
    const createItem = createItemFactory(() => id);
    const expectedState = Immutable.OrderedSet().add(id);

    const actualState = itemsOrderReducer(undefined, createItem('value'));

    expect(actualState).toEqual(expectedState);
    expect(actualState.has(id)).toBeTruthy();
  });
});
