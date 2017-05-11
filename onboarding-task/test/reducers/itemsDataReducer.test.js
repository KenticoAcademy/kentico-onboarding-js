import * as Immutable from 'immutable';

import { Item } from '../../src/models/Item.ts';
import { editItem, deleteItem } from '../../src/actions/actionCreators';
import { itemsDataReducer } from '../../src/reducers/itemsDataReducer';
import { positivelyCreateItemLocally } from '../../src/actions/actionCreators';


describe('itemsDataReducer', () => {
  const id = 'da5cbf5f-2d20-4945-b8d2-4cc3b6be1542';
  const ueid = '2235d270-3918-48d9-95f7-a1b0ef008126';
  const value = 'text before';
  const item = new Item({
    id,
    ueid,
    value
  });
  const stateWithItem = Immutable.Map().set(
    id,
    item
  );
  const unknownAction = { type: 'unknown action' };

  it('set new value for existing item', () => {
    const expectedText = 'expected text';
    const expectedState = stateWithItem.setIn([id, 'value'], expectedText);

    const actualState = itemsDataReducer(stateWithItem, editItem(id, expectedText));

    expect(actualState).toEqual(expectedState);
  });

  it('delete item for given id', () => {
    const actualState = itemsDataReducer(stateWithItem, deleteItem(id));

    expect(actualState.has(id)).toBeFalsy();
  });

  it('create new item after positivelyCreateItemLocally action', () => {
    const expectedState = Immutable.Map().set(
      ueid,
      new Item({
        id: "",
        ueid,
        value
      })
    );

    const actualState = itemsDataReducer(undefined, positivelyCreateItemLocally(item));

    expect(actualState).toEqual(expectedState);
  });

  it('unknown action passed to reducer returns previous state', () => {
    const actualState = itemsDataReducer(stateWithItem, unknownAction);

    expect(actualState).toEqual(stateWithItem);
  });

  it('send undefined state, initializes default state correctly', () => {
    const actualState = itemsDataReducer(undefined, unknownAction);

    expect(actualState).toEqual(Immutable.Map());
  });
});
