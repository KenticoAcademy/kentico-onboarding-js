import { OrderedMap } from 'immutable';
import { byId } from '../../reducers/items/byId.ts';
import { Item } from '../../models/Item.ts';
import {
  deleteItem,
  textUpdateChange,
  toggleEditing,
  updateItemText,
} from '../../actions/actionCreators.ts';
import { addItem } from '../../actions/addItem.ts';

const mockId = () => '2';

describe('byId', () => {
  it('returns map filled with new item with correct text and id when called addItem', () => {
    const newId = mockId();
    const expectedState = new OrderedMap({
      [newId]: new Item({
        id: newId,
        text: 'tested item',
        isBeingEdited: false,
        synchronized: false,
      }),
    });
    const stateAfter = byId(undefined, addItem(mockId(), 'tested item'));

    expect(stateAfter).toEqual(expectedState);
  });

  it('returns map with item with correctly updated text and with canceled editing when called updateItem', () => {
    const itemId = mockId();
    const stateBefore = new OrderedMap({
      [itemId]: new Item({
        id: itemId,
        text: 'This item hasn\'t been updated yet',
        isBeingEdited: true,
        textUpdate: 'This item is already edited',
      }),
    });
    const expectedState = new OrderedMap({
      [itemId]: new Item({
        id: itemId,
        text: 'This item is already edited',
        isBeingEdited: false,
        textUpdate: 'This item is already edited',
      }),
    });

    const stateAfter = byId(stateBefore, updateItemText(itemId));

    expect(stateAfter).toEqual(expectedState);
  });

  it('returns map without selected item  when called deleteItem', () => {
    const itemId = mockId();
    const stateBefore = new OrderedMap({
      [itemId]: new Item({
        id: itemId,
        text: 'This item is sad because it will be deleted soon',
        isBeingEdited: true,
      }),
    });
    const expectedState = new OrderedMap();

    const stateAfter = byId(stateBefore, deleteItem(itemId));

    expect(stateAfter).toEqual(expectedState);
  });

  it('switches isBeingEdited to opposite value than is set  when called toggleEditing', () => {
    const itemId = mockId();

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
        textUpdate: '',
      }),
    });

    const stateAfter = byId(stateBefore, toggleEditing(itemId, false));

    expect(stateAfter).toEqual(expectedState);
  });

  it('returns given text in textUpdate  when called textUpdateChange', () => {
    const itemId = mockId();

    const stateBefore = new OrderedMap({
      [itemId]: new Item({
        id: itemId,
        text: 'Not important',
        isBeingEdited: true,
        textUpdate: 'Not this one',
      }),
    });
    const expectedState = new OrderedMap({
      [itemId]: new Item({
        id: itemId,
        text: 'Not important',
        isBeingEdited: true,
        textUpdate: 'This is correctly changed text',
      }),
    });

    const stateAfter = byId(stateBefore, textUpdateChange(itemId, 'This is correctly changed text'));

    expect(stateAfter).toEqual(expectedState);
  });
});
