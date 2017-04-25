import * as Immutable from 'immutable';

import { ItemFlags } from '../../src/models/ItemFlags.ts';
import { toggleItemViewMode, deleteItem, editItem } from '../../src/actions/actionCreators';
import { createItemFactory } from '../../src/actions/createItemFactory';
import { itemsFlagReducer } from '../../src/reducers/itemsFlagReducer';

describe('ItemsFlagReducer', () => {
  const id = 'da5cbf5f-2d20-4945-b8d2-4cc3b6be1542';
  const stateWithItemFlags = Immutable.Map().set(
    id,
    new ItemFlags({
      id,
      editMode: true
    })
  );
  const unknownAction = { type: 'unknown action' };

  it('toggle view mode: switch to edit mode(editMode=true)', () => {
    const state = Immutable.Map().setIn([id, 'editMode'], false);

    const actualState = itemsFlagReducer(state, toggleItemViewMode(id));

    expect(actualState.getIn([id, 'editMode'])).toBeTruthy();
  });

  it('delete flag for given id', () => {
    const actualState = itemsFlagReducer(stateWithItemFlags, deleteItem(id));

    expect(actualState.has(id)).toBeFalsy();
  });

  it('create flag for given id', () => {
    const ueid = '2235d270-3918-48d9-95f7-a1b0ef008126';
    const createItem = createItemFactory(() => ueid);

    const actualState = itemsFlagReducer(undefined, createItem("some value"));

    expect(actualState.has(ueid)).toBeTruthy();
  });

  it('toggle edit flag after edit', () => {
    const actualState = itemsFlagReducer(stateWithItemFlags, editItem(id, "value"));

    expect(actualState.getIn([id, 'editMode'])).toBeFalsy();
  });

  it('unknown action passed to reducer returns previous state', () => {
    const actualState = itemsFlagReducer(stateWithItemFlags, unknownAction);

    expect(actualState).toEqual(stateWithItemFlags);
  });

  it('send undefined state, initializes default state correctly', () => {
    const actualState = itemsFlagReducer(undefined, unknownAction);

    expect(actualState).toEqual(Immutable.Map());
  });
});
