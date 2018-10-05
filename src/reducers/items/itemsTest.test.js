import { OrderedMap } from 'immutable';
import { ListItem } from '../../models/ListItem';
import { items } from './items.js';
import {
  stopEditing,
  deleteItem,
  updateText,
  startEditing,
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

  it('should return the initial state with undefined state', () => {
    expect(
      items(undefined, {})
    ).toEqual(OrderedMap());
  });

  it('should return previous state on unknown action', () => {
    const expectedState = defaultItems;

    const actualState = items(defaultItems, {
      type: 'UNKNOWN_ACTION',
      payload: {
        text: 'Run the tests',
        id: itemId
      }
    });

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

  it('should delete selected item when DELETE_ITEM action is dispatched', () => {
    const expectedState = OrderedMap();

    const actualState = items(defaultItems, deleteItem(itemId));

    expect(actualState).toEqual(expectedState);
  });

  it('should start edit mode of selected item when START_EDITING action is dispatched', () => {
    const expectedState = OrderedMap([
      [
        itemId,
        new ListItem({
          id: itemId,
          text: 'Buy Milk',
          isInEditMode: true
        })
      ]
    ]);

    const actualState = items(defaultItems, startEditing(itemId));

    expect(actualState).toEqual(expectedState);
  });

  it('should end edit mode of selected item when STOP_EDITING action is dispatched', () => {
    const expectedState = OrderedMap([
      [
        itemId,
        new ListItem({
          id: itemId,
          text: 'Buy Milk',
          isInEditMode: false
        })
      ]
    ]);

    const actualState = items(defaultItems, stopEditing(itemId));

    expect(actualState).toEqual(expectedState);
  });

  it('should update selected item when UPDATE_TEXT action is dispatched', () => {
    const newText = 'Buy Beer';

    const expectedState = OrderedMap([
      [
        itemId,
        new ListItem({
          id: itemId,
          text: newText,
        })
      ]
    ]);

    const actualState = items(defaultItems, updateText(itemId, newText));

    expect(actualState).toEqual(expectedState);
  });
});
