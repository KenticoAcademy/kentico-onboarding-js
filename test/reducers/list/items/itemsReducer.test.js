import { OrderedMap } from 'immutable';
import { ListItem } from '../../../../src/models/ListItem';
import deepFreeze from 'deep-freeze';
import { itemsReducer } from '../../../../src/reducers/list/items/index';
import * as actions from '../../../../src/actions/actionCreators';
import * as actionsExtended from '../../../../src/actions/actionCreatorsWithDependency';

describe('itemsReducer', () => {
  it('will add ListItem model to state with specific text', () => {
    const initialState = OrderedMap();
    deepFreeze(initialState);

    const expectedId = 'test';
    const expectedTest = 'text';
    const expectedState = OrderedMap({
      [expectedId]: new ListItem({
        id: expectedId,
        text: expectedTest,
      }),
    });

    const fakeCreateId = () => expectedId;
    const addNewItemAction = actionsExtended.addNewItem(fakeCreateId, expectedTest);
    const result = itemsReducer(initialState, addNewItemAction);

    expect(result)
      .toEqual(expectedState);
  });

  it('will open ListItem for editing', () => {
    const expectedId = 'test';
    const expectedText = 'text';
    const initialState = OrderedMap({
      [expectedId]: new ListItem({
        id: expectedId,
        text: expectedText,
      }),
    });
    deepFreeze(initialState);

    const expectedState = OrderedMap({
      [expectedId]: new ListItem({
        id: expectedId,
        text: expectedText,
        isBeingEdited: true,
      }),
    });

    const selectItemTextAction = actions.openItemForEditing(expectedId);
    const result = itemsReducer(initialState, selectItemTextAction);

    expect(result)
      .toEqual(expectedState);
  });

  it('will change item text to \'something else\'', () => {
    const expectedId = 'test';
    const expectedNewText = 'something else';
    const initialState = OrderedMap({
      [expectedId]: new ListItem({
        id: expectedId,
        text: 'something',
        isBeingEdited: true,
      }),
    });
    deepFreeze(initialState);

    const expectedState = OrderedMap({
      [expectedId]: new ListItem({
        id: expectedId,
        text: expectedNewText,
        isBeingEdited: false,
      }),
    });

    const changeItemTextAction = actions.saveItemChanges(expectedId, expectedNewText);
    const result = itemsReducer(initialState, changeItemTextAction);

    expect(result)
      .toEqual(expectedState);
  });

  it('will cancel changes and put ListItem in { isBeingEdited: false } state', () => {
    const expectedId = 'test';
    const expectedText = 'whatever';
    const initialState = OrderedMap({
      [expectedId]: new ListItem({
        id: expectedId,
        text: expectedText,
        isBeingEdited: true,
      }),
    });
    deepFreeze(initialState);

    const expectedState = OrderedMap({
      [expectedId]: new ListItem({
        id: expectedId,
        text: expectedText,
        isBeingEdited: false,
      }),
    });

    const cancelItemChangesAction = actions.cancelItemChanges(expectedId);
    const result = itemsReducer(initialState, cancelItemChangesAction);

    expect(result)
      .toEqual(expectedState);
  });

  it('will delete item with { id: test } from state', () => {
    const expectedId = 'test';
    const expectedText = 'also whatever';
    const otherId = 'other-id';
    const initialState = OrderedMap({
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

    const expectedState = OrderedMap({
      [otherId]: new ListItem({
        id: otherId,
        text: expectedText,
        isBeingEdited: false,
      }),
    });

    const deleteItemAction = actions.deleteItem(expectedId);
    const result = itemsReducer(initialState, deleteItemAction);

    expect(result)
      .toEqual(expectedState);
  });
});
