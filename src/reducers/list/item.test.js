import React from 'react';

import { Item } from '../../models/item';
import { item } from './item';
import {
  changeItemValue,
  saveItem,
  startItemEditing,
  stopItemEditing,
} from '../../actions/actionCreators';
import { getIdentifier } from '../../utils/getIdentifier';

describe('items reducer works correctly', () => {
  it('ITEM_SAVE updates correct item in map', () => {
    const savedText = 'save item';
    const key = getIdentifier();

    const mapItem = new Item({
      key,
      value: 'add item',
      temporaryValue: savedText,
    });
    const expected = mapItem.merge({ value: savedText });

    const action = saveItem(key);
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

  it('undefined action returns new state', () => {
    const action = { type: undefined };
    const actual = item(undefined, action);

    expect(actual).toEqual(Item());
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
