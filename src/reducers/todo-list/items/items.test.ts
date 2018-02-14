import * as actions from '../../../actions/actionCreators';
import {
  OrderedMap,
} from 'immutable';
import { items } from './items';
import { insertItem, postSuccess, putSuccess } from '../../../actions/actionCreators';
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
        id: plainItem2.id,
        isSynchronized: true
      }),
    ).toJS();

    expect(newState).toEqual(expectedState);
  });

  it('should update item\'s id after ITEM_POST_SUCCESS action', () => {
    const idFromServer = '4061431b-40b1-4c24-a99b-8dc505e879ed';
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
        idFromServer,
        new ListItem({
          ...plainItem1,
          id: idFromServer
        })
      ],
      [
        plainItem2.id,
        new ListItem(plainItem2)
      ]
    ]).toJS();

    const newState: OrderedMap<Uuid, ListItem> = items(
      twoItemsState,
      postSuccess({
        newId: idFromServer,
        id: plainItem1.id,
        text: plainItem1.text,
        isSynchronized: true
      })
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

  it('should delete record after ITEM_DELETE_SUCCESS action', () => {
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
      actions.deleteSuccess(plainItem1.id),
    ).toJS();

    expect(newState).toEqual(expectedState);
  });

  it('should add error message to item after ITEM_DELETE_ERROR action', () => {
    const errorMessage = 'this time it is really bad';
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
    const expectedState: OrderedMap<Uuid, ListItem> = twoItemsState.update(
      plainItem1.id,
      () => new ListItem({
        ...plainItem1,
        isSynchronized: true,
        errorMessage
      })
    ).toJS();

    const newState: OrderedMap<Uuid, ListItem> = items(
      twoItemsState,
      actions.deleteError({
        id: plainItem1.id,
        message: errorMessage
      }),
    ).toJS();

    expect(newState).toEqual(expectedState);
  });

  it('should set item to delete state after TODO_LIST_ITEM_DELETE action', () => {
    const singleItemState: OrderedMap<Uuid, ListItem> = OrderedMap([
      [
        plainItem1.id,
        new ListItem(plainItem1)
      ],
      [
        plainItem2.id,
        new ListItem(plainItem2)
      ]
    ]);
    const itemBeingDeleted = new ListItem({
      ...plainItem1,
      isEdited: false,
      isSynchronized: false,
    });
    const expectedState: OrderedMap<Uuid, ListItem> = singleItemState.update(plainItem1.id, () => itemBeingDeleted);

    const newState: OrderedMap<Uuid, ListItem> = items(
      singleItemState,
      actions.deleteItem(plainItem1.id)
    );

    expect(newState).toEqual(expectedState);
  });

  it('should update correct item after TODO_LIST_ITEM_UPDATE action', () => {
    const updatedText: string = 'updatedText';
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
        plainItem1.id,
        new ListItem({
          ...plainItem1,
          text: updatedText,
          isEdited: false,
          isSynchronized: false,
          backupText: plainItem1.text
        }),
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
        text: updatedText,
      }),
    ).toJS();

    expect(newState).toEqual(expectedState);
  });

  it('should update correct item after ITEM_PUT_SUCCESS action accordingly', () => {
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
    const expectedState: OrderedMap<Uuid, ListItem> = twoItemsState.update(
      plainItem2.id,
      () => new ListItem({
        ...plainItem2,
        isSynchronized: true,
        errorMessage: ''
      }));

    const newState: OrderedMap<Uuid, ListItem> = items(
      twoItemsState,
      putSuccess(plainItem2.id)
    );

    expect(newState).toEqual(expectedState);
  });

  it('should revert item back after ITEM_PUT_ERROR action', () => {
    const errorMessage = 'something went really wrong';
    const backupText = 'some intelligent backup text';
    const twoItemsState: OrderedMap<Uuid, ListItem> = OrderedMap([
      [
        plainItem1.id,
        new ListItem(plainItem1)
      ],
      [
        plainItem2.id,
        new ListItem({
          ...plainItem2,
          backupText
        }),
      ],
    ]);
    const expectedState: OrderedMap<Uuid, ListItem> = twoItemsState.update(
      plainItem2.id,
      () => new ListItem({
        ...plainItem2,
        isSynchronized: true,
        text: backupText,
        backupText,
        errorMessage
      })).toJS();

    const newState: OrderedMap<Uuid, ListItem> = items(
      twoItemsState,
      actions.putError({
        id: plainItem2.id,
        message: errorMessage
      })
    ).toJS();

    expect(newState).toEqual(expectedState);
  });

  it('should delete item\'s error message after CLOSE_ITEM_ERROR action', () => {
    const errorMessage = 'something went really wrong';
    const twoItemsState: OrderedMap<Uuid, ListItem> = OrderedMap([
      [
        plainItem1.id,
        new ListItem(plainItem1)
      ],
      [
        plainItem2.id,
        new ListItem({
          ...plainItem2,
          errorMessage
        }),
      ],
    ]);
    const expectedState: OrderedMap<Uuid, ListItem> = twoItemsState.update(
      plainItem2.id,
      () => new ListItem({
        ...plainItem2,
        errorMessage: ''
      })).toJS();

    const newState: OrderedMap<Uuid, ListItem> = items(
      twoItemsState,
      actions.closeItemError(plainItem2.id)
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
