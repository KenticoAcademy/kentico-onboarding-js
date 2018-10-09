import { OrderedMap } from 'immutable';
import { ListItem } from '../../models/ListItem';
import { items } from './items.js';
import {
  deleteItem,
} from '../../actions/index';
import { addItemFactory } from '../../actions/addItemFactory';

describe('items reducer', () => {
  const itemId = '5';
  const defaultItems = OrderedMap([
    [
      itemId,
      new ListItem({
        id: itemId,
        text: 'Buy Milk',
      })
    ]
  ]);

  const unknownAction = {
    type: 'UNKNOWN_ACTION',
    payload: {
      text: 'Run the tests',
      id: itemId
    }
  };

  it('should return the initial state with undefined state', () => {
    const expectedState = OrderedMap();

    const actualState = items(undefined, unknownAction);

    expect(expectedState).toEqual(actualState);
  });

  it('should return previous state on unknown action', () => {
    const expectedState = defaultItems;

    const actualState = items(defaultItems, unknownAction);

    expect(expectedState).toEqual(actualState);
  });

  it('should add new item to the store when ADD_ITEM action is dispatched', () => {
    const generateId = () => '5';
    const itemText = 'Run the tests';
    const expectedState = OrderedMap([
      [
        itemId,
        new ListItem({
          id: itemId,
          text: itemText
        })
      ]
    ]);

    const actualState = items(OrderedMap(), addItemFactory(generateId)(itemText));

    expect(expectedState).toEqual(actualState);
  });

  it('should delete selected item when ITEM_DELETE action is dispatched', () => {
    const expectedState = OrderedMap();

    const actualState = items(defaultItems, deleteItem(itemId));

    expect(expectedState).toEqual(actualState);
  });
});
