import * as Immutable from 'immutable';

import { ItemFlags } from '../../src/models/ItemFlags.ts';
import { toggleItemViewMode, deleteItem, editItem } from '../../src/actions/actionCreators';
import { createItemFactory } from '../../src/actions/createItemFactory';
import { itemsFlagReducer } from '../../src/reducers/itemsFlagReducer';

describe('ItemsFlagReducer', () => {
  it('toggle view mode: switch to edit mode(EditMode=true)', () => {
    const id = 'da5cbf5f-2d20-4945-b8d2-4cc3b6be1542';
    const state = Immutable.Map().set(
      id,
      new ItemFlags({
        id,
        editMode: false
      })
    );

    const actualState = itemsFlagReducer(state, toggleItemViewMode(id));
    expect(actualState.get(id).editMode).toBeTruthy();
  });

  it('delete flag for given id', () => {
    const id = 'da5cbf5f-2d20-4945-b8d2-4cc3b6be1542';
    const state = Immutable.Map().set(
      id,
      new ItemFlags({
        id,
        editMode: true
      })
    );

    const actualState = itemsFlagReducer(state, deleteItem(id));
    expect(actualState.has(id)).toBeFalsy();
  });

  it('create flag for given id', () => {
    const id = 'da5cbf5f-2d20-4945-b8d2-4cc3b6be1542';
    const createItem = createItemFactory(() => id);
    const state = Immutable.Map();

    const actualState = itemsFlagReducer(state, createItem("some value"));

    expect(actualState.has(id)).toBeTruthy();
  });

  it('toggle edit flag after edit', () => {
    const id = 'da5cbf5f-2d20-4945-b8d2-4cc3b6be1542';
    const state = Immutable.Map().set(
      id,
      new ItemFlags({
        id,
        editMode: true
      })
    );

    const actualState = itemsFlagReducer(state, editItem(id, "value"));

    expect(actualState.getIn([id, 'editMode'])).toBeFalsy();
  });

  it('unknown action passed to reducer returns previous state', () => {
    const id = 'da5cbf5f-2d20-4945-b8d2-4cc3b6be1542';
    const state = Immutable.Map().set(
      id,
      new ItemFlags({
        id,
        editMode: true
      })
    );

    let action = editItem(id, "value");
    action.type = 'unknown action';
    const actualState = itemsFlagReducer(state, action);

    expect(actualState.getIn([id, 'editMode'])).toBeTruthy();
  });

  it('send undefined state, initializes state correctly', () => {
    const id = 'da5cbf5f-2d20-4945-b8d2-4cc3b6be1542';
    const createItem = createItemFactory(() => id);
    const value = 'value';
    const expectedState = Immutable.Map().set(id, new ItemFlags({ editMode: false }));

    const actualState = itemsFlagReducer(undefined, createItem(value));

    expect(actualState).toEqual(expectedState);
    expect(actualState.has(id)).toBeTruthy();
  });
});
