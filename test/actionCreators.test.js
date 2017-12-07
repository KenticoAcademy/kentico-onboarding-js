import * as types from '../src/actionTypes';
import * as actions from '../src/actions/actionCreators';
import * as actionsExtended from '../src/actions/actionCreatorsWithDependency';

describe('actionCreators', () => {
  it('will create valid addNewItem action object', () => {
    const expectedText = 'dsa';
    const expectedId = 'testGuid';
    const expectedAction = {
      type: types.ITEM_CREATED,
      payload: {
        itemId: expectedId,
        text: expectedText,
      },
    };

    const fakeActionCreator = () => expectedId;
    const result = actionsExtended.addNewItem(fakeActionCreator, expectedText);

    expect(result)
      .toEqual(expectedAction);
  });

  it('will create valid openItemForEditing action object', () => {
    const expectedId = 'testGuid';

    const expectedAction = {
      type: types.ITEM_OPENED_FOR_EDITING,
      payload: {
        itemId: expectedId,
      },
    };

    const result = actions.openItemForEditing(expectedId);

    expect(result)
      .toEqual(expectedAction);
  });

  it('will create valid saveItemChanges action object', () => {
    const expectedId = 'testGuid';
    const expectedNewText = 'new text';

    const expectedAction = {
      type: types.ITEM_CHANGES_SAVED,
      payload: {
        newText: expectedNewText,
        itemId: expectedId,
      },
    };

    const result = actions.saveItemChanges(expectedId, expectedNewText);

    expect(result)
      .toEqual(expectedAction);
  });

  it('will create valid cancelItemChanges action object', () => {
    const expectedId = 'testGuid';
    const expectedAction = {
      type: types.ITEM_CHANGES_CANCELED,
      payload: {
        itemId: expectedId,
      },
    };

    const result = actions.cancelItemChanges(expectedId);

    expect(result)
      .toEqual(expectedAction);
  });

  it('will create valid deleteItem action object', () => {
    const expectedId = 'testGuid';
    const expectedAction = {
      type: types.ITEM_DELETED,
      payload: {
        itemId: expectedId,
      },
    };

    const result = actions.deleteItem(expectedId);

    expect(result)
      .toEqual(expectedAction);
  });
});
