import React from 'react';

import { Item } from '../../models/item';
import {
  saveItem,
  cancelItemEditing,
} from './itemActions';
import { getIdentifier } from '../../utils/getIdentifier';

describe('item help actions works correctly', () => {
  it('saveItem sets value and isBeignEdited correctly', () => {
    const savedText = 'save item';
    const key = getIdentifier();

    const mapItem = new Item({
      key,
      value: 'add item',
      temporaryValue: savedText,
      isBeingEdited: true,
    });
    const expected = mapItem.merge({ value: savedText, isBeingEdited: false });

    const actual = saveItem(mapItem);

    expect(actual).toEqual(expected);
  });

  it('cancelItemEditing sets temporaryValue and isBeignEdited correctly', () => {
    const originalValue = 'save item';
    const key = getIdentifier();

    const mapItem = new Item({
      key,
      value: originalValue,
      temporaryValue: 'updated value',
      isBeingEdited: true,
    });
    const expected = mapItem.merge({ temporaryValue: originalValue, isBeingEdited: false });

    const actual = cancelItemEditing(mapItem);

    expect(actual).toEqual(expected);
  });
});
