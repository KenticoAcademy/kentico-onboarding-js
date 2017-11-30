import * as types from '../src/actionTypes';
import * as actions from '../src/actionCreators';

describe('actionCreators', () => {
  it('will create valid addNewItem action object', () => {
    const expectedText = 'dsa';
    const expectedId = 'testGuid';
    const expectedAction = {
      type: types.ITEM_CREATED,
      itemId: expectedId,
      text: expectedText,
    };

    const actionParams = {
      itemId: expectedId,
      text: expectedText,
    };
    const result = actions.addNewItem(actionParams);

    expect(result)
      .toEqual(expectedAction);
  });

  it('will create valid selectItemText action object', () => {
    const expectedId = 'testGuid';
    const expectedStartOffset = 2;
    const expectedEndOffset = 3;

    const expectedAction = {
      type: types.ITEM_TEXT_SELECTED,
      itemId: expectedId,
      selectionRangeStarts: expectedStartOffset,
      selectionRangeEnds: expectedEndOffset,
    };

    const actionParams = {
      itemId: expectedId,
      selectionRangeStarts: expectedStartOffset,
      selectionRangeEnds: expectedEndOffset,
    };
    const result = actions.selectItemText(actionParams);

    expect(result)
      .toEqual(expectedAction);
  });

  it('will create valid changeItemText action object', () => {
    const expectedId = 'testGuid';
    const expectedNewText = 'new text';

    const expectedAction = {
      type: types.ITEM_CHANGE_SAVED,
      newText: expectedNewText,
      itemId: expectedId,
    };

    const actionParams = {
      itemId: expectedId,
      newText: expectedNewText,
    };
    const result = actions.changeItemText(actionParams);

    expect(result)
      .toEqual(expectedAction);
  });

  it('will create valid cancelItemChanges action object', () => {
    const expectedId = 'testGuid';
    const expectedAction = {
      type: types.ITEM_CHANGES_CANCELED,
      itemId: expectedId,
    };

    const actionParams = {
      itemId: expectedId,
    };
    const result = actions.cancelItemChanges(actionParams);

    expect(result)
      .toEqual(expectedAction);
  });

  it('will create valid deleteItem action object', () => {
    const expectedId = 'testGuid';
    const expectedAction = {
      type: types.ITEM_DELETED,
      itemId: expectedId,
    };

    const actionParams = {
      itemId: expectedId,
    };
    const result = actions.deleteItem(actionParams);

    expect(result)
      .toEqual(expectedAction);
  });
});
