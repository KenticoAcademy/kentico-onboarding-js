import { OrderedMap } from 'immutable';
import { generateId } from '../../utils/generateId';
import { itemsById } from './itemsById';
import { Item } from '../../models/Item';
import {
  addItem,
  deleteItem,
  toggleEditing,
  updateItemText,
} from '../../actions/actionCreators';

describe('itemsById', () => {
  it('addItem returns map filled with new item with correct text and id', () => {
    const newId = generateId();
    const expectedState = new OrderedMap({
      [newId]: new Item({
        id: newId,
        text: 'tested item',
        isBeingEdited: false,
      }),
    });
    const stateAfter = itemsById(undefined, addItem(newId, 'tested item'));

    expect(stateAfter).toEqual(expectedState);
  });

  it('updateItem returns map with item with correctly updated text and with canceled editing', () => {
    const itemId = generateId();
    const stateBefore = new OrderedMap({
      [itemId]: new Item({
        id: itemId,
        text: 'This item hasn\'t been updated yet',
        isBeingEdited: true,
      }),
    });
    const expectedState = new OrderedMap({
      [itemId]: new Item({
        id: itemId,
        text: 'This item is already edited',
        isBeingEdited: false,
      }),
    });

    const stateAfter = itemsById(stateBefore, updateItemText(itemId, 'This item is already edited'));

    expect(stateAfter).toEqual(expectedState);
  });

  it('deleteItem returns map without selected item', () => {
    const itemId = generateId();
    const stateBefore = new OrderedMap({
      [itemId]: new Item({
        id: itemId,
        text: 'This item is sad because it will be deleted soon',
        isBeingEdited: true,
      }),
    });
    const expectedState = new OrderedMap();

    const stateAfter = itemsById(stateBefore, deleteItem(itemId));

    expect(stateAfter).toEqual(expectedState);
  });

  it('toggleEditing switches isBeingEdited to given value', () => {
    const itemId = generateId();

    const stateBefore = new OrderedMap({
      [itemId]: new Item({
        id: itemId,
        text: 'This item should obviously not be edited',
        isBeingEdited: true,
      }),
    });
    const expectedState = new OrderedMap({
      [itemId]: new Item({
        id: itemId,
        text: 'This item should obviously not be edited',
        isBeingEdited: false,
      }),
    });

    const stateAfter = itemsById(stateBefore, toggleEditing(itemId, false));

    expect(stateAfter).toEqual(expectedState);
  });
})
;

