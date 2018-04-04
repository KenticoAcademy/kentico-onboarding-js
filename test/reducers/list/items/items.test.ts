import { OrderedMap } from 'immutable';
import { ListItem } from '../../../../src/models/classes/ListItem';
import * as deepFreeze from 'deep-freeze';
import { items } from '../../../../src/reducers/list/items/items';
import { Guid } from '../../../../src/models/Guid';
import { IAddedItemConfirmed } from '../../../../src/models/interfaces/IAddedItemConfirmed';
import { IAction } from '../../../../src/models/interfaces/IAction';
import { IUpdatedItem } from '../../../../src/models/interfaces/IUpdatedItem';
import { IFetchedItem } from '../../../../src/models/interfaces/IFetchedItem';
import {
  confirmItemAddition,
  requestItemAddition,
} from '../../../../src/actions/thunk/addItemFactory';
import {
  toggleItem,
  deleteUnsavedItem,
  revertAdd,
  revertUpdate,
} from '../../../../src/actions';
import {
  confirmItemUpdate,
  requestItemUpdate,
} from '../../../../src/actions/thunk/updateItemFactory';
import {
  confirmItemDeletion,
  requestItemDeletion,
} from '../../../../src/actions/thunk/deleteItemFactory';
import { receiveFetchedItems } from '../../../../src/actions/thunk/fetchItemsFactory';

describe('items', () => {
  it('will add ListItem model to state with specific text', () => {
    const initialState = OrderedMap<Guid, ListItem>();
    deepFreeze(initialState);

    const expectedId = 'test';
    const expectedText = 'text';

    const expectedState = OrderedMap<Guid, ListItem>({
      [expectedId]: new ListItem({
        id: expectedId,
        text: expectedText,
      }),
    });

    const newItem = {
      id: expectedId,
      text: expectedText,
      isBeingEdited: false,
      uri: '',
    };
    const addNewItemAction = requestItemAddition(newItem);
    const result = items(initialState, addNewItemAction);

    expect(result)
      .toEqual(expectedState);
  });

  it('will add ListItem model to undefined state', () => {
    const expectedId = 'test';
    const expectedText = 'text';

    const expectedState = OrderedMap<Guid, ListItem>({
      [expectedId]: new ListItem({
        id: expectedId,
        text: expectedText,
      }),
    });

    const newItem = {
      id: expectedId,
      text: expectedText,
      isBeingEdited: false,
      uri: '',
    };
    const addNewItemAction = requestItemAddition(newItem);
    const result = items(undefined, addNewItemAction);

    expect(result)
      .toEqual(expectedState);
  });


  it('will open ListItem for editing', () => {
    const expectedId = 'test';
    const expectedText = 'text';

    const initialState = OrderedMap<Guid, ListItem>({
      [expectedId]: new ListItem({
        id: expectedId,
        text: expectedText,
      }),
    });
    deepFreeze(initialState);

    const expectedState = OrderedMap<Guid, ListItem>({
      [expectedId]: new ListItem({
        id: expectedId,
        text: expectedText,
        isBeingEdited: true,
      }),
    });

    const selectItemTextAction = toggleItem(expectedId);
    const result = items(initialState, selectItemTextAction);

    expect(result)
      .toEqual(expectedState);
  });

  it('will change item text to \'something else\'', () => {
    const expectedId = 'test';
    const expectedNewText = 'something else';

    const initialState = OrderedMap<Guid, ListItem>({
      [expectedId]: new ListItem({
        id: expectedId,
        text: 'something',
        isBeingEdited: true,
        syncedText: '',
      }),
    });
    deepFreeze(initialState);

    const expectedState = OrderedMap<Guid, ListItem>({

      [expectedId]: new ListItem({
        id: expectedId,
        text: expectedNewText,
        isBeingEdited: false,
      }),
    });

    const actionParams: IUpdatedItem = {
      id: expectedId,
      text: expectedNewText,
      syncedText: expectedNewText,
    };
    const changeItemTextAction = requestItemUpdate(actionParams);
    const result = items(initialState, changeItemTextAction);

    expect(result)
      .toEqual(expectedState);
  });

  it('will cancel changes and put ListItem in { isBeingEdited: false } state', () => {
    const expectedId = 'test';
    const expectedText = 'whatever';

    const initialState = OrderedMap<Guid, ListItem>({
      [expectedId]: new ListItem({
        id: expectedId,
        text: expectedText,
        isBeingEdited: true,
      }),
    });
    deepFreeze(initialState);

    const expectedState = OrderedMap<Guid, ListItem>({
      [expectedId]: new ListItem({
        id: expectedId,
        text: expectedText,
        isBeingEdited: false,
      }),
    });

    const cancelItemChangesAction = toggleItem(expectedId);
    const result = items(initialState, cancelItemChangesAction);

    expect(result)
      .toEqual(expectedState);
  });

  it('will execute undefined action', () => {

    const initialState = OrderedMap<Guid, ListItem>({
      '0': new ListItem({
        id: '0',
        text: 'text',
        isBeingEdited: true,
      }),
      '1': new ListItem({
        id: '1',
        text: 'text2',
        isBeingEdited: false,
      }),
    });
    deepFreeze(initialState);

    const undefinedAction = {
      type: 'UNKNOWN',
      payload: 'whatever',
    };
    const result = items(initialState, undefinedAction);

    expect(result)
      .toEqual(initialState);
  });

  [confirmItemDeletion, deleteUnsavedItem, revertAdd]
    .forEach(actionCreator =>
      it('will delete item with { id: test } from state', () => {
        const expectedId = 'test';
        const expectedText = 'also whatever';
        const otherId = 'other-id';

        const initialState = OrderedMap<Guid, ListItem>({
          [expectedId]: new ListItem({
            id: expectedId,
            text: 'whatever',
            isBeingEdited: true,
          }),
          [otherId]: new ListItem({
            id: otherId,
            text: expectedText,
            isBeingEdited: false,
          }),
        });
        deepFreeze(initialState);

        const expectedState = OrderedMap<Guid, ListItem>({
          [otherId]: new ListItem({
            id: otherId,
            text: expectedText,
            isBeingEdited: false,
          }),
        });

        const deleteItemAction = actionCreator(expectedId);
        const result = items(initialState, deleteItemAction);

        expect(result)
          .toEqual(expectedState);
      }));

  it('will receive items and populate state', () => {
    const initialState = undefined;

    const listItem1: IFetchedItem = {
      id: 'fakeId',
      text: 'whatever',
    };
    const listItem2: IFetchedItem = {
      id: 'fakeId2',
      text: 'something else',
    };
    const fakeItems: IFetchedItem[] = [
      listItem1,
      listItem2,
    ];

    const expectedState = OrderedMap<Guid, ListItem>({
      [listItem1.id]: new ListItem({
        ...listItem1,
        syncedText: listItem1.text,
        }),
      [listItem2.id]: new ListItem({
        ...listItem2,
        syncedText: listItem2.text,
      }),
    });

    const receiveItemsAction = receiveFetchedItems(fakeItems);
    const result = items(initialState, receiveItemsAction);

    expect(result)
      .toEqual(expectedState);
  });

  it('will replace old item with the same item containing updated id', () => {
    const oldId = 'oldId';
    const newId = 'newId';
    const listItem1Old = new ListItem({
      id: oldId,
      text: 'whatever',
    });
    const listItem1New = new ListItem({
      id: newId,
      text: 'whatever',
      syncedText: 'whatever',
    });
    const listItem2 = new ListItem({
      id: 'fakeId',
      text: 'something else',
    });
    const initialState = OrderedMap<Guid, ListItem>({
      [listItem1Old.id]: listItem1Old,
      [listItem2.id]: listItem2,
    });
    deepFreeze(initialState);

    const expectedState = OrderedMap<Guid, ListItem>({
      [listItem2.id]: listItem2,
      [listItem1New.id]: listItem1New,
    });

    const actionParams: IAddedItemConfirmed = {
      oldId,
      updatedItem: {
        id: newId,
        text: listItem1Old.text,
        isBeingEdited: false,
        syncedText: listItem1Old.syncedText,
      },
    };
    const confirmAddedItemAction = confirmItemAddition(actionParams);
    const result = items(initialState, confirmAddedItemAction);

    expect(result)
      .toEqual(expectedState);
  });

  it('will change isBeingEdited value to false', () => {
    const id = 'id';
    const listItem = new ListItem({
      id,
      text: 'whatever',
      isBeingEdited: true,
    });
    const listItemClosed = new ListItem({
      id,
      text: 'whatever',
      isBeingEdited: false,
    });

    const initialState = OrderedMap<Guid, ListItem>({
      [listItem.id]: listItem,
    });
    deepFreeze(initialState);

    const expectedState = OrderedMap<Guid, ListItem>({
      [listItemClosed.id]: listItemClosed,
    });

    const closeItemAction = requestItemDeletion(id);
    const result = items(initialState, closeItemAction);

    expect(result)
      .toEqual(expectedState);
  });

  it('will not change item value isBeingEdited', () => {
    const id = 'id';
    const listItem = new ListItem({
      id,
      text: 'whatever',
      isBeingEdited: false,
    });
    const listItemSame = new ListItem({
      id,
      text: 'whatever',
      isBeingEdited: false,
    });

    const initialState = OrderedMap<Guid, ListItem>({
      [listItem.id]: listItem,
    });
    deepFreeze(initialState);

    const expectedState = OrderedMap<Guid, ListItem>({
      [listItemSame.id]: listItemSame,
    });

    const closeItemAction = requestItemDeletion(id);
    const result = items(initialState, closeItemAction);

    expect(result)
      .toEqual(expectedState);
  });

  it('will set items to empty ordered map', () => {
    const initialState = undefined;
    const expectedState = OrderedMap<Guid, ListItem>();

    const action: IAction = {
      type: 'testType',
      payload: null,
    };
    const result = items(initialState, action);

    expect(result)
      .toBe(expectedState);
  });

  it('will set items synced text to the new value', () => {
    const oldListItem = new ListItem({
      id: 'id',
      text: 'newText',
      syncedText: 'oldText',
      isBeingEdited: false,
    });
    const newListItem = new ListItem({
      id: 'id',
      text: 'newText',
      syncedText: 'newText',
      isBeingEdited: false,
    });
    const initialState = OrderedMap<Guid, ListItem>({
      [oldListItem.id]: oldListItem,
    });
    deepFreeze(initialState);

    const expectedState = OrderedMap<Guid, ListItem>({
      [newListItem.id]: newListItem,
    });

    const closeItemAction = confirmItemUpdate(oldListItem.id);
    const result = items(initialState, closeItemAction);

    expect(result)
      .toEqual(expectedState);
  });

  it('will set items synced text to the old value', () => {
    const oldListItem = new ListItem({
      id: 'id',
      text: 'newText',
      syncedText: 'oldText',
      isBeingEdited: false,
    });
    const newListItem = new ListItem({
      id: 'id',
      text: 'oldText',
      syncedText: 'oldText',
      isBeingEdited: false,
    });
    const initialState = OrderedMap<Guid, ListItem>({
      [oldListItem.id]: oldListItem,
    });
    deepFreeze(initialState);

    const expectedState = OrderedMap<Guid, ListItem>({
      [newListItem.id]: newListItem,
    });

    const closeItemAction = revertUpdate(oldListItem.id);
    const result = items(initialState, closeItemAction);

    expect(result)
      .toEqual(expectedState);
  });
});
