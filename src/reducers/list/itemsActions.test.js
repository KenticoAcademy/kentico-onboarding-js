import React from 'react';

import { Item } from '../../models/item';
import {
  saveItems,
  cancelItemsEditing,
} from './itemsActions';
import { getIdentifier } from '../../utils/getIdentifier';
import { OrderedMap } from 'immutable';

describe('items help actions works correctly', () => {
  it('saveItems sets value and isBeignEdited to correct items', () => {
    const savedText = 'save item';
    const key1 = getIdentifier();
    const key2 = getIdentifier();

    const mapItem1 = new Item({
      key: key1,
      value: 'add item',
      temporaryValue: savedText,
      isBeingEdited: true,
    });
    const mapItem2 = new Item({
      key: key2,
      value: 'add item',
      temporaryValue: savedText,
      isBeingEdited: true,
    });

    const state = new OrderedMap()
      .set(key1, mapItem1)
      .set(key2, mapItem2);
    const expected = new OrderedMap()
      .set(key1, mapItem1.merge({ value: savedText, isBeingEdited: false }))
      .set(key2, mapItem2.merge({ value: savedText, isBeingEdited: false }));

    const actual = saveItems(state, [key1, key2]);

    expect(actual).toEqual(expected);
  });

  it('cancelItemsEditing sets temporaryValue and isBeignEdited to correct items', () => {
    const originalText = 'add item';
    const key1 = getIdentifier();
    const key2 = getIdentifier();

    const mapItem1 = new Item({
      key: key1,
      value: originalText,
      temporaryValue: 'updated1',
      isBeingEdited: true,
    });
    const mapItem2 = new Item({
      key: key2,
      value: originalText,
      temporaryValue: 'updated2',
      isBeingEdited: true,
    });

    const state = new OrderedMap()
      .set(key1, mapItem1)
      .set(key2, mapItem2);
    const expected = new OrderedMap()
      .set(key1, mapItem1.merge({ temporaryValue: originalText, isBeingEdited: false }))
      .set(key2, mapItem2.merge({ temporaryValue: originalText, isBeingEdited: false }));

    const actual = cancelItemsEditing(state, [key1, key2]);

    expect(actual).toEqual(expected);
  });
});
