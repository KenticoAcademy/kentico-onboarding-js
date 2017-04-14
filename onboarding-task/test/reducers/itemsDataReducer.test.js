import * as Immutable from 'immutable';

import { Item } from '../../src/models/Item.ts';
import { ItemFlags } from '../../src/models/ItemFlags.ts';
import { editItem, deleteItem } from '../../src/actions/actionCreators';
import { createItemFactory } from '../../src/actions/createItemFactory';
import { itemsDataReducer } from '../../src/reducers/itemsDataReducer';


describe('itemsDataReducer', () => {
  it('set new value for existing item', () => {
    const id = 'da5cbf5f-2d20-4945-b8d2-4cc3b6be1542';
    const state = Immutable.Map().set(
      id,
      new Item({
        id,
        value: 'old text'
      })
    );
    const expectedText = 'expected text';
    const expectedNewState = state.setIn([id, 'value'], expectedText);

    const actualState = itemsDataReducer(state, editItem(id, expectedText));

    expect(actualState).toEqual(expectedNewState);
  });

  it('delete item for given id', () => {
    const id = 'da5cbf5f-2d20-4945-b8d2-4cc3b6be1542';
    const state = Immutable.Map().set(
      id,
      new ItemFlags({
        id,
        editMode: true
      })
    );

    const actualState = itemsDataReducer(state, deleteItem(id));
    expect(actualState.has(id)).toBeFalsy();
  });

  it('create new item', () => {
    const id = 'da5cbf5f-2d20-4945-b8d2-4cc3b6be1542';
    const createItem = createItemFactory(() => id);
    const value = 'text';
    const item = new Item({
      id,
      value,
    });
    const state = Immutable.Map();
    const expectedState = state.set(
      id,
      item
    );

    const actualState = itemsDataReducer(state, createItem(value));

    expect(actualState).toEqual(expectedState);
  });

  it('unknown action passed to reducer returns previous state', () => {
    const id = 'da5cbf5f-2d20-4945-b8d2-4cc3b6be1542';
    const value = 'text';
    const item = new Item({
      id,
      value,
    });
    const expectedState = Immutable.Map().set(
      id,
      item
    );

    let action = deleteItem(id);
    action.type = 'unknown action';
    const actualState = itemsDataReducer(expectedState, action);

    expect(actualState).toEqual(expectedState);
  });

  it('send undefined state, initializes state correctly', () => {
    const id = 'da5cbf5f-2d20-4945-b8d2-4cc3b6be1542';
    const createItem = createItemFactory(() => id);
    const value = 'text';
    const item = new Item({
      id,
      value,
    });
    const expectedState = Immutable.Map().set(
      id,
      item
    );

    const actualState = itemsDataReducer(undefined, createItem(value));

    expect(actualState).toEqual(expectedState);
    expect(actualState.has(id)).toBeTruthy();
  });
});
