import * as types from '../src/actionTypes';
import * as actions from '../src/actionCreators';

describe('actions', () => {
  it('should create ITEM_CREATED action', () => {
    const expectedText = 'dsa';
    const expectedId = 'testGuid';
    const expectedAction = {
      type: types.ITEM_CREATED,
      itemId: expectedId,
      text: expectedText,
    };

    expect(
      actions.createItem({
        itemId: expectedId,
        text: expectedText,
      }))
      .toEqual(expectedAction);
  });

  it('should create ITEM_CLICKED action', () => {
    const expectedId = 'testGuid';
    const expectedStartOffset = 2;
    const expectedEndOffset = 3;

    const expectedAction = {
      type: types.ITEM_CLICKED,
      itemId: expectedId,
      selectionRangeStarts: expectedStartOffset,
      selectionRangeEnds: expectedEndOffset,
    };

    expect(
      actions.clickItem({
        itemId: expectedId,
        selectionRangeStarts: expectedStartOffset,
        selectionRangeEnds: expectedEndOffset,
      }))
      .toEqual(expectedAction);
  });

  it('should create ITEM_CHANGE_SAVED action', () => {
    const expectedId = 'testGuid';
    const expectedNewText = 'new text';

    const expectedAction = {
      type: types.ITEM_CHANGE_SAVED,
      newText: expectedNewText,
      itemId: expectedId,
    };

    expect(
      actions.changeItem({
        itemId: expectedId,
        newText: expectedNewText,
      }))
      .toEqual(expectedAction);
  });

  it('should create ITEM_CHANGE_CANCELED action', () => {
    const expectedId = 'testGuid';
    const expectedAction = {
      type: types.ITEM_CHANGE_CANCELED,
      itemId: expectedId,
    };

    expect(
      actions.cancelItemChange({ itemId: expectedId }))
      .toEqual(expectedAction);
  });

  it('should create ITEM_DELETED action', () => {
    const expectedId = 'testGuid';
    const expectedAction = {
      type: types.ITEM_DELETED,
      itemId: expectedId,
    };

    expect(
      actions.deleteItem({ itemId: expectedId }))
      .toEqual(expectedAction);
  });
});
