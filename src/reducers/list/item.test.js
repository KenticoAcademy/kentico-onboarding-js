import React from 'react';
import { OrderedMap } from 'immutable';

import { Item } from '../../models/item';
import { item } from './item';
import {
  changeItemValue,
  startItemEditing,
  stopItemEditing,
} from '../../actions/itemActions';
import { getIdentifier } from '../../utils/uuidService';

describe('items reducer works correctly', () => {
  it('ITEM_EDITING_START sets edited flag to correct item', () => {
    const key = getIdentifier();

    let state = new OrderedMap();
    const mapItem = new Item({
      key,
      value: 'save item',
      isBeingEdited: false,
    });
    state = state.set(key, mapItem);
    const expected = state.mergeIn([key], { isBeingEdited: true });

    const action = startItemEditing(key);
    const actual = item(state, action);

    expect(actual).toEqual(expected);
  });

  it('ITEM_EDITING_STOP un-sets edited flag to correct item', () => {
    const changeableValue = 'save item';
    const key = getIdentifier();

    let state = new OrderedMap();
    const mapItem = new Item({
      key,
      value: changeableValue,
      isBeingEdited: true,
      changeableValue: 'save item changed',
    });
    state = state.set(key, mapItem);
    const expected = state.mergeIn([key], { isBeingEdited: false, changeableValue });

    const action = stopItemEditing(key);
    const actual = item(state, action);

    expect(actual).toEqual(expected);
  });

  it('ITEM_VALUE_CHANGED changes correct item', () => {
    const changeableValue = 'changed item';
    const key = getIdentifier();

    let state = new OrderedMap();
    const mapItem = new Item({
      key,
      value: 'save item',
      isBeingEdited: true,
      changeableValue: 'save item',
    });
    state = state.set(key, mapItem);
    const expected = state.mergeIn([key], { changeableValue });

    const action = changeItemValue(key, changeableValue);
    const actual = item(state, action);

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
    const actual = item(expected, action);

    expect(actual).toEqual(expected);
  });
});
