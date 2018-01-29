import * as actions from '../../../actions/actionCreators';
import {
  OrderedMap,
} from 'immutable';
import { items } from './items';
import { insertItem } from '../../../actions/actionCreators';
import { ListItem } from '../../../models/ListItem';
import { Uuid } from '../../../utils/generateId';

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

  it('should return the initial state', () => {
    const initialState = items(undefined, unknownAction);

    expect(initialState).toEqual(OrderedMap());
  });

  it('should add record to non-empty store on ITEM_CREATE action', () => {
    const singleItemState: OrderedMap<Uuid, ListItem> = OrderedMap([
      [
        plainItem1.id,
        new ListItem(plainItem1),
      ],
    ]);
    const expectedState: OrderedMap<Uuid, ListItem> = OrderedMap([
      [
        plainItem1.id,
        new ListItem(plainItem1),
      ],
      [
        plainItem2.id,
        new ListItem(plainItem2),
      ],
    ]).toJS();

    const newState: OrderedMap<Uuid, ListItem> = items(
      singleItemState,
      insertItem({
        text: plainItem2.text,
        id: plainItem2.id
      }),
    ).toJS();

    expect(newState).toEqual(expectedState);
  });

  it('should make item editable on ITEM_EDIT action', () => {
    const expectedState: OrderedMap<Uuid, ListItem> = OrderedMap([
      [
        plainItem1.id,
        new ListItem({
          ...plainItem1,
          isEdited: true,
        }),
      ],
    ]).toJS();
    const singleItemState: OrderedMap<Uuid, ListItem> = OrderedMap([
      [
        plainItem1.id,
        new ListItem(plainItem1),
      ],
    ]);

    const newState: OrderedMap<Uuid, ListItem> = items(
      singleItemState,
      actions.editItem(plainItem1.id),
    ).toJS();

    expect(newState).toEqual(expectedState);
  });

  it('should make item non-editable on ITEM_CANCEL_EDIT action', () => {
    const singleItemState: OrderedMap<Uuid, ListItem> = OrderedMap([
      [
        plainItem1.id,
        new ListItem({
          ...plainItem1,
          isEdited: true,
        }),
      ],
    ]);
    const expectedState: OrderedMap<Uuid, ListItem> = OrderedMap([
      [
        plainItem1.id,
        new ListItem({
          ...plainItem1,
          isEdited: false,
        }),
      ],
    ]).toJS();

    const newState: OrderedMap<Uuid, ListItem> = items(
      singleItemState,
      actions.cancelItemEditing(plainItem1.id),
    ).toJS();

    expect(newState).toEqual(expectedState);
  });

  it('should delete record after ITEM_DELETE action', () => {
    const twoItemsState: OrderedMap<Uuid, ListItem> = OrderedMap([
      [
        plainItem1.id,
        new ListItem(plainItem1),
      ],
      [
        plainItem2.id,
        new ListItem(plainItem2),
      ],
    ]);
    const expectedState: OrderedMap<Uuid, ListItem> = twoItemsState.delete(plainItem1.id).toJS();

    const newState: OrderedMap<Uuid, ListItem> = items(
      twoItemsState,
      actions.deleteItem(plainItem1.id),
    ).toJS();

    expect(newState).toEqual(expectedState);
  });

  it('should update correct item after ITEM_UPDATE action', () => {
    const updatedText: string = 'updatedText';
    const updatedItem: ListItem = new ListItem({
      id: plainItem1.id,
      text: updatedText,
      isEdited: !plainItem1.isEdited,
    });
    const twoItemsState: OrderedMap<Uuid, ListItem> = OrderedMap([
      [
        plainItem1.id,
        new ListItem(plainItem1),
      ],
      [
        plainItem2.id,
        new ListItem(plainItem2),
      ],
    ]);
    const expectedState: OrderedMap<Uuid, ListItem> = OrderedMap([
      [
        updatedItem.id,
        new ListItem(updatedItem),
      ],
      [
        plainItem2.id,
        new ListItem(plainItem2),
      ],
    ]).toJS();

    const newState: OrderedMap<Uuid, ListItem> = items(
      twoItemsState,
      actions.updateItem({
        id: plainItem1.id,
        text: updatedText
      }),
    ).toJS();

    expect(newState).toEqual(expectedState);
  });

  it('should return prevState on unknown action', () => {
    const singleItemState: OrderedMap<Uuid, ListItem> = OrderedMap([
      [
        plainItem1.id,
        new ListItem({
          ...plainItem1,
          isEdited: true,
        }),
      ],
    ]);
    const expectedState: OrderedMap<Uuid, ListItem> = singleItemState.toJS();

    const newState: OrderedMap<Uuid, ListItem> = items(
      singleItemState,
      unknownAction,
    ).toJS();

    expect(newState).toEqual(expectedState);
  });
});
