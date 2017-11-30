import * as actions from '../../../actions/actionCreators';
import {
  OrderedMap,
} from 'immutable';
import { items } from './items';
import { insertItemFactory } from '../../../actions/insertItemFactory';
import { ListItem } from '../../../models/ListItem';

describe('items reducers', () => {
  const plainItem1 = {
    id: '16b1706c-1311-418d-aaaa-d6043f2e7f1f',
    text: 'Make a coffee',
    isEdited: false,
  };
  const plainItem2 = {
    id: '16b1706c-1311-418d-bdba-d6043f2e7f1f',
    text: 'Do these tests',
    isEdited: false,
  };
  const UNKNOWN_ACTION_DUPLICATE = 'UNKNOWN_ACTION_DUPLICATE';
  const unknownAction = {
    type: UNKNOWN_ACTION_DUPLICATE,
    payload: {
      item: plainItem2,
    },
  };

  const insertItem = id => insertItemFactory(() => id);

  it('should return the initial state', () => {
    const initialState = items(undefined, unknownAction);

    expect(initialState).toEqual(OrderedMap());
  });

  it('should add record to non-empty store on ITEM_CREATE action', () => {
    const singleItemState = new OrderedMap([
      [
        plainItem1.id,
        new ListItem(plainItem1),
      ],
    ]);
    const expectedState = new OrderedMap([
      [
        plainItem1.id,
        new ListItem(plainItem1),
      ],
      [
        plainItem2.id,
        new ListItem(plainItem2),
      ],
    ]).toJS();
    const insertItemAction = insertItem(plainItem2.id);

    const newState = items(
      singleItemState,
      insertItemAction(plainItem2.text),
    ).toJS();

    expect(newState).toEqual(expectedState);
  });

  it('should make item editable on ITEM_EDIT action', () => {
    const expectedState = new OrderedMap([
      [
        plainItem1.id,
        new ListItem({
          ...plainItem1,
          isEdited: true,
        }),
      ],
    ]).toJS();
    const singleItemState = new OrderedMap([
      [
        plainItem1.id,
        new ListItem(plainItem1),
      ],
    ]);

    const newState = items(
      singleItemState,
      actions.editItem(plainItem1.id),
    ).toJS();

    expect(newState).toEqual(expectedState);
  });

  it('should make item non-editable on ITEM_CANCEL_EDIT action', () => {
    const singleItemState = new OrderedMap([
      [
        plainItem1.id,
        new ListItem({
          ...plainItem1,
          isEdited: true,
        }),
      ],
    ]);
    const expectedState = new OrderedMap([
      [
        plainItem1.id,
        new ListItem({
          ...plainItem1,
          isEdited: false,
        }),
      ],
    ]).toJS();

    const newState = items(
      singleItemState,
      actions.cancelItemEditing(plainItem1.id),
    ).toJS();

    expect(newState).toEqual(expectedState);
  });

  it('should delete record after ITEM_DELETE action', () => {
    const twoItemsState = new OrderedMap([
      [
        plainItem1.id,
        new ListItem(plainItem1),
      ],
      [
        plainItem2.id,
        new ListItem(plainItem2),
      ],
    ]);
    const expectedState = twoItemsState.delete(plainItem1.id).toJS();

    const newState = items(
      twoItemsState,
      actions.deleteItem(plainItem1.id),
    ).toJS();

    expect(newState).toEqual(expectedState);
  });

  it('should update correct item after ITEM_UPDATE action', () => {
    const updatedText = 'updatedText';
    const updatedItem = {
      id: plainItem1.id,
      text: updatedText,
      isEdited: !plainItem1.isEdited,
    };
    const twoItemsState = new OrderedMap([
      [
        plainItem1.id,
        new ListItem(plainItem1),
      ],
      [
        plainItem2.id,
        new ListItem(plainItem2),
      ],
    ]);
    const expectedState = OrderedMap([
      [
        updatedItem.id,
        new ListItem(updatedItem),
      ],
      [
        plainItem2.id,
        new ListItem(plainItem2),
      ],
    ]).toJS();

    const newState = items(
      twoItemsState,
      actions.updateItem(plainItem1.id, updatedText),
    ).toJS();

    expect(newState).toEqual(expectedState);
  });

  it('should return prevState on unknown action', () => {
    const singleItemState = new OrderedMap([
      [
        plainItem1.id,
        new ListItem({
          ...plainItem1,
          isEdited: true,
        }),
      ],
    ]);
    const expectedState = singleItemState.toJS();

    const newState = items(
      singleItemState,
      unknownAction,
    ).toJS();

    expect(newState).toEqual(expectedState);
  });
});
