import React from 'react';

import { Item } from '../../models/item';
import { item } from './item';
import {
  changeItemValue,
  startItemEditing,
  stopItemEditing,
} from '../../actions/itemActions';

describe('items reducer works correctly', () => {
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
    const changeableValue = 'changed item';

    const originalItem = new Item({
      value: 'test',
      isBeingEdited: true,
      temporaryValue: 'change test',
    });
    const expected = originalItem.merge({ changeableValue: temporaryValue });

    const action = changeItemValue(originalItem.key, changeableValue);
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
