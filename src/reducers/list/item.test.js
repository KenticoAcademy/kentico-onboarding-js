import { Item } from '../../models/Item.ts';
import { item } from './item.ts';
import {
  changeItemValue,
  startItemEditing,
  stopItemEditing,
  saveItemSuccess,
  deleteItemFailed,
  deleteItemOptimistic,
  saveItemFailed,
  saveItemOptimistic,
  addItemFailed,
} from '../../actions/index.ts';

describe('items reducer works correctly', () => {
  it('ITEM_SAVE_SUCCESS updates correct item in map', () => {
    const savedText = 'save item';
    const key = 'idX';

    const mapItem = new Item({
      key,
      value: 'add item',
      temporaryValue: savedText,
    });
    const expected = mapItem.merge({ value: savedText });

    const action = saveItemSuccess(key);
    const actual = item(mapItem, action);

    expect(actual).toEqual(expected);
  });

  it('ITEM_EDITING_START sets edited flag to correct item', () => {
    const originalItem = new Item({
      value: 'test',
      isBeingEdited: false,
      temporaryValue: 'test',
    });
    const expected = originalItem.merge({ isBeingEdited: true });

    const action = startItemEditing(originalItem.key);
    const actual = item(originalItem, action);

    expect(actual).toEqual(expected);
  });

  it('ITEM_EDITING_STOP un-sets edited flag to correct item', () => {
    const originalItem = new Item({
      value: 'test',
      isBeingEdited: true,
      temporaryValue: 'change test',
    });
    const expected = originalItem.merge({
      temporaryValue: originalItem.value,
      isBeingEdited: false,
    });

    const action = stopItemEditing(originalItem.key);
    const actual = item(originalItem, action);

    expect(actual).toEqual(expected);
  });

  it('ITEM_VALUE_CHANGED changes correct item', () => {
    const temporaryValue = 'changed item';

    const originalItem = new Item({
      value: 'test',
      isBeingEdited: true,
      temporaryValue: 'change test',
    });
    const expected = originalItem.merge({ temporaryValue });

    const action = changeItemValue(originalItem.key, temporaryValue);
    const actual = item(originalItem, action);

    expect(actual).toEqual(expected);
  });

  it('ITEM_DELETE_OPTIMISTIC sets disabled flag to correct item', () => {
    const originalItem = new Item({
      value: 'test',
      isBeingEdited: false,
      temporaryValue: 'test',
    });
    const expected = originalItem.merge({ isDisabled: true });

    const action = deleteItemOptimistic(originalItem.key);
    const actual = item(originalItem, action);

    expect(actual).toEqual(expected);
  });

  it('ITEM_DELETE_FAILED sets disabled flag to correct item', () => {
    const originalItem = new Item({
      value: 'test',
      isBeingEdited: false,
      temporaryValue: 'test',
      isDisabled: true,
    });
    const expected = originalItem.merge({ isDisabled: false });

    const action = deleteItemFailed(originalItem.key, '');
    const actual = item(originalItem, action);

    expect(actual).toEqual(expected);
  });

  it('ITEM_SAVE_OPTIMISTIC sets disabled flag to correct item', () => {
    const originalItem = new Item({
      value: 'test',
      isBeingEdited: false,
      temporaryValue: 'test',
    });
    const expected = originalItem.merge({ isDisabled: true });

    const action = saveItemOptimistic(originalItem.key);
    const actual = item(originalItem, action);

    expect(actual).toEqual(expected);
  });

  it('ITEM_SAVE_FAILED sets disabled flag to correct item', () => {
    const originalItem = new Item({
      value: 'test',
      isBeingEdited: false,
      temporaryValue: 'test',
      isDisabled: true,
    });
    const expected = originalItem.merge({ isDisabled: false });

    const action = saveItemFailed(originalItem.key, '');
    const actual = item(originalItem, action);

    expect(actual).toEqual(expected);
  });

  it('ITEM_ADD_FAILED sets isBeingEdited flag and isDisabled flag to correct item', () => {
    const originalItem = new Item({
      value: 'test',
      isBeingEdited: false,
      temporaryValue: 'change test',
      isDisabled: true,
    });
    const expected = originalItem.merge({
      isBeingEdited: true,
      isDisabled: false,
    });

    const action = addItemFailed(originalItem.key, '');
    const actual = item(originalItem, action);

    expect(actual).toEqual(expected);
  });

  it('undefined action returns new state', () => {
    const action = { type: undefined };
    const actual = item(undefined, action);

    expect(actual).toEqual(new Item());
  });

  it('undefined action returns previous state', () => {
    const expected = new Item({
      isBeingEdited: true,
      value: 'test',
      temporaryValue: 'change test',
    });

    const action = { type: undefined };
    const actual = item(expected, action);

    expect(actual).toEqual(expected);
  });
});
