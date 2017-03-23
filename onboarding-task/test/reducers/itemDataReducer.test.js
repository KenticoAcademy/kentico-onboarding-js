import * as Immutable from 'immutable';

import {Item} from '../../src/models/Item.ts';
import {editItem, createItem, deleteItem} from '../../src/actions/actionCreators';
import {itemDataReducer} from '../../src/reducers/itemDataReducer';

describe('itemDataReducer', () => {
  it('set new value for existing item', () => {
    const id = 'da5cbf5f-2d20-4945-b8d2-4cc3b6be1542';
    const state = Immutable.Map().set(
      id,
      new Item({
        id,
        value: 'old text'
      })
    );
    const expectedNewState = state.setIn([id, 'value'], 'expected text');

    const actualState = itemDataReducer(state, editItem(id, 'expected text'));

    expect(actualState).toEqual(expectedNewState);
  });

  it('create new item', () => {
    const id = 'da5cbf5f-2d20-4945-b8d2-4cc3b6be1542';
    const state = Immutable.Map();
    const expectedNewState = state.set(id, 'text');

    const actualState = itemDataReducer(state, createItem(id, 'text'));

    expect(actualState).toEqual(expectedNewState);
  });

  it('delete item for given id', () => {
    const id = 'da5cbf5f-2d20-4945-b8d2-4cc3b6be1542';
    const state = Immutable.Map().set(
      id,
      new Item({
        id,
        editMode: true
      })
    );

    const actualState = itemDataReducer(state, deleteItem(id));
    expect(actualState.has(id)).toBeFalsy();
  });
});
