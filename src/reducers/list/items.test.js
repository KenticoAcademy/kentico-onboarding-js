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
import {
  changeItemValue,
  startItemEditing,
  stopItemEditing,
} from '../../actions/itemActions';

describe('items reducer works correctly', () => {
  it('ITEM_ADD returns map with correct item', () => {
    const testValue = 'add item';
    const expected = new Item({
      value: testValue,
      isBeingEdited: false,
      temporaryValue: testValue,
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
    const expected = state.mergeIn([key], { value: savedText, temporaryValue: savedText });

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
    const actual = items(state, action);

    expect(actual).toEqual(expected);
  });

  it('ITEM_EDITING_STOP return state with edited flag on correct item', () => {
    const changeableValue = 'save item';
    const key = getIdentifier();

    let state = new OrderedMap();
    const mapItem = new Item({
      key,
      value: changeableValue,
      isBeingEdited: true,
      temporaryValue: 'save item changed',
    });
    state = state.set(key, mapItem);
    const expected = state.mergeIn([key], {
      isBeingEdited: false,
      changeableValue: temporaryValue,
    });

    const action = stopItemEditing(key);
    const actual = items(state, action);

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
      temporaryValue: 'save item',
    });
    state = state.set(key, mapItem);
    const expected = state.mergeIn([key], { changeableValue: temporaryValue });

    const action = changeItemValue(key, changeableValue);
    const actual = items(state, action);

    expect(actual).toEqual(expected);
  });

  it('undefined action returns new state', () => {
    const action = { type: undefined };
    const actual = items(undefined, action);

    expect(actual).toEqual(OrderedMap());
  });

  it('undefined action returns previous state', () => {
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
