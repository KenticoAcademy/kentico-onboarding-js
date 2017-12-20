import { OrderedMap } from 'immutable';
import { ListItem } from '../../../../src/models/ListItem';
import * as deepFreeze from 'deep-freeze';
import { items } from '../../../../src/reducers/list/items/items';
import * as actions from '../../../../src/actions/actionCreators';
import * as actionsExtended from '../../../../src/actions/actionCreatorsWithDependency';

describe('items', () => {
  it('will add ListItem model to state with specific text', () => {
    const initialState = OrderedMap<string, ListItem>();
    deepFreeze(initialState);

    const expectedId = 'test';
    const expectedTest = 'text';
    const expectedState = OrderedMap<string, ListItem>({
      [expectedId]: new ListItem({
        id: expectedId,
        text: expectedTest,
      }),
    });

    const fakeCreateId = () => expectedId;
    const addNewItem = actionsExtended.addNewItemFactory(fakeCreateId);
    const addNewItemAction = addNewItem(expectedTest);
    const result = items(initialState, addNewItemAction);

    expect(result)
      .toEqual(expectedState);
  });

  it('will add ListItem model to undefined state', () => {
    const expectedId = 'test';
    const expectedTest = 'text';
    const expectedState = OrderedMap<string, ListItem>({
      [expectedId]: new ListItem({
        id: expectedId,
        text: expectedTest,
      }),
    });

    const fakeCreateId = () => expectedId;
    const addNewItem = actionsExtended.addNewItemFactory(fakeCreateId);
    const addNewItemAction = addNewItem(expectedTest);
    const result = items(undefined, addNewItemAction);

    expect(result)
      .toEqual(expectedState);
  });


  it('will open ListItem for editing', () => {
    const expectedId = 'test';
    const expectedText = 'text';
    const initialState = OrderedMap<string, ListItem>({
      [expectedId]: new ListItem({
        id: expectedId,
        text: expectedText,
      }),
    });
    deepFreeze(initialState);

    const expectedState = OrderedMap<string, ListItem>({
      [expectedId]: new ListItem({
        id: expectedId,
        text: expectedText,
        isBeingEdited: true,
      }),
    });

    const selectItemTextAction = actions.openItemForEditing(expectedId);
    const result = items(initialState, selectItemTextAction);

    expect(result)
      .toEqual(expectedState);
  });

  it('will change item text to \'something else\'', () => {
    const expectedId = 'test';
    const expectedNewText = 'something else';
    const initialState = OrderedMap<string, ListItem>({
      [expectedId]: new ListItem({
        id: expectedId,
        text: 'something',
        isBeingEdited: true,
      }),
    });
    deepFreeze(initialState);

    const expectedState = OrderedMap<string, ListItem>({
      [expectedId]: new ListItem({
        id: expectedId,
        text: expectedNewText,
        isBeingEdited: false,
      }),
    });

    const changeItemTextAction = actions.saveItemChanges(expectedId, expectedNewText);
    const result = items(initialState, changeItemTextAction);

    expect(result)
      .toEqual(expectedState);
  });

  it('will cancel changes and put ListItem in { isBeingEdited: false } state', () => {
    const expectedId = 'test';
    const expectedText = 'whatever';
    const initialState = OrderedMap<string, ListItem>({
      [expectedId]: new ListItem({
        id: expectedId,
        text: expectedText,
        isBeingEdited: true,
      }),
    });
    deepFreeze(initialState);

    const expectedState = OrderedMap<string, ListItem>({
      [expectedId]: new ListItem({
        id: expectedId,
        text: expectedText,
        isBeingEdited: false,
      }),
    });

    const cancelItemChangesAction = actions.cancelItemChanges(expectedId);
    const result = items(initialState, cancelItemChangesAction);

    expect(result)
      .toEqual(expectedState);
  });

  it('will execute undefined action', () => {
    const initialState = OrderedMap<string, ListItem>({
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

  it('will delete item with { id: test } from state', () => {
    const expectedId = 'test';
    const expectedText = 'also whatever';
    const otherId = 'other-id';
    const initialState = OrderedMap<string, ListItem>({
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

    const expectedState = OrderedMap<string, ListItem>({
      [otherId]: new ListItem({
        id: otherId,
        text: expectedText,
        isBeingEdited: false,
      }),
    });

    const deleteItemAction = actions.deleteItem(expectedId);
    const result = items(initialState, deleteItemAction);

    expect(result)
      .toEqual(expectedState);
  });
});
