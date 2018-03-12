import React from 'react';
import { OrderedMap } from 'immutable';

import { Item } from '../../models/item';
import { items } from './items';
import {
  addItem,
  deleteItem,
  saveItem,
} from '../../actions/listActions';
import { getIdentifier } from '../../utils/uuidService';

describe('items reducer works correctly', () => {
  it('ITEM_ADD returns map with correct item', () => {
    const testValue = 'add item';
    const expected = new Item({
      value: testValue,
      isBeingEdited: false,
      changeableValue: testValue,
    });

    const action = addItem(testValue);
    const newList = items(undefined, action);
    const actual = newList.first();

    expect(actual).toEqual(expected.merge({ key: actual.key }));
  });

  it('ITEM_SAVE updates correct item in map', () => {
    const savedText = 'save item';
    const key = getIdentifier();

    let state = new OrderedMap();
    const mapItem = new Item({
      key,
      value: 'add item',
    });
    state = state.set(key, mapItem);
    const expected = state.mergeIn([key], { value: savedText, changeableValue: savedText });

    const action = saveItem(key, savedText);
    const actual = items(state, action);

    expect(actual).toEqual(expected);
  });

  it('ITEM_DELETE deletes correct item in map', () => {
    const key = getIdentifier();
    const expected = new OrderedMap();

    let state = new OrderedMap();
    const mapItem = new Item({
      key,
      value: 'add item',
    });
    state = state.set(key, mapItem);

    const action = deleteItem(key);
    const actual = items(state, action);

    expect(actual).toEqual(expected);
  });

  it('undefined action returns state', () => {
    const key = getIdentifier();

    let expected = new OrderedMap();
    const mapItem = new Item({
      key,
      value: 'add item',
    });
    expected = expected.set(key, mapItem);

    const action = { type: undefined };
    const actual = items(expected, action);

    expect(actual).toEqual(expected);
  });
});
