import { OrderedMap } from 'immutable';

import { Item } from '../../models/Item.ts';
import { items } from './items.ts';
import {
  addItemSuccess,
  getItemsSuccess,
  deleteItem,
  deleteItems,
  saveItem,
  saveItems,
  changeItemValue,
  startItemEditing,
  stopItemEditing,
  cancelItemsEditing,
} from '../../actions/index.ts';
import { saveItemSuccess } from '../../actions';

describe('items reducer works correctly', () => {
  it('ITEM_ADD_SUCCESS inserts new Item to state', () => {
    const serverItem = { id: 'idX', text: 'idX text' };
    const item = new Item({
      key: serverItem.id,
      value: serverItem.text,
      temporaryValue: serverItem.text,
    });
    const mapItemY = new Item({
      key: 'idY',
      value: 'idY item',
    });
    const mapItemZ = new Item({
      key: 'idZ',
      value: 'idZ item',
    });
    const state = new OrderedMap()
      .set(mapItemY.key, mapItemY)
      .set(mapItemZ.key, mapItemZ);
    const expected = state.set(serverItem.id, item);

    const action = addItemSuccess(serverItem);
    const actual = items(state, action);

    expect(actual.toJS()).toEqual(expected.toJS());
  });

  it('ITEM_SAVE_SUCCESS updates correct item in map', () => {
    const savedText = 'save item';
    const key = 'idX';

    const mapItem = new Item({
      key,
      value: 'add item',
      temporaryValue: savedText,
    });
    const state = new OrderedMap().set(key, mapItem);
    const expected = state.mergeIn([key], { value: savedText });

    const action = saveItemSuccess(key);
    const actual = items(state, action);

    expect(actual).toEqual(expected);
  });

  it('ITEM_SAVE_ALL updates correct items in map', () => {
    const savedText = 'save item';
    const key1 = 'idX';
    const key2 = 'idY';

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
    const expected = state
      .mergeIn([key1], { value: savedText, isBeingEdited: false })
      .mergeIn([key2], { value: savedText, isBeingEdited: false });

    const action = saveItems([key1, key2]);
    const actual = items(state, action);

    expect(actual).toEqual(expected);
  });

  it('ITEM_DELETE deletes correct item in map', () => {
    const key = 'idX';
    const expected = new OrderedMap();

    const mapItem = new Item({
      key,
      value: 'add item',
    });
    const state = new OrderedMap().set(key, mapItem);

    const action = deleteItem(key);
    const actual = items(state, action);

    expect(actual).toEqual(expected);
  });

  it('ITEM_DELETE_ALL deletes correct items in map', () => {
    const key1 = 'idX';
    const key2 = 'idY';
    const key3 = 'idZ';

    const mapItem1 = new Item({
      key: key1,
      value: 'add item',
    });
    const mapItem2 = new Item({
      key: key2,
      value: 'add item',
    });
    const mapItem3 = new Item({
      key: key3,
      value: 'add item',
    });
    const state = new OrderedMap()
      .set(key1, mapItem1)
      .set(key2, mapItem2)
      .set(key3, mapItem3);
    const expected = new OrderedMap()
      .set(key2, mapItem2);

    const action = deleteItems([key1, key3]);
    const actual = items(state, action);

    expect(actual).toEqual(expected);
  });

  it('ITEM_EDITING_START sets edited flag to correct item', () => {
    const key = 'idX';

    const mapItem = new Item({
      key,
      value: 'save item',
      isBeingEdited: false,
    });
    const state = new OrderedMap().set(key, mapItem);
    const expected = state.mergeIn([key], { isBeingEdited: true });

    const action = startItemEditing(key);
    const actual = items(state, action);

    expect(actual).toEqual(expected);
  });

  it('ITEM_EDITING_STOP returns state with edited flag on correct item', () => {
    const changeableValue = 'save item';
    const key = 'idX';

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
      temporaryValue: changeableValue,
    });

    const action = stopItemEditing(key);
    const actual = items(state, action);

    expect(actual).toEqual(expected);
  });

  it('ITEM_EDITING_STOP_ALL returns state with edited flag on correct items', () => {
    const changeableValue = 'save item';
    const key1 = 'idX';
    const key2 = 'idY';

    const mapItem1 = new Item({
      key: key1,
      value: changeableValue,
      isBeingEdited: true,
      temporaryValue: 'save item changed',
    });
    const mapItem2 = new Item({
      key: key2,
      value: changeableValue,
      isBeingEdited: true,
      temporaryValue: 'save item changed',
    });
    const state = new OrderedMap()
      .set(key1, mapItem1)
      .set(key2, mapItem2);
    const expected = state
      .mergeIn([key1], { isBeingEdited: false, temporaryValue: changeableValue })
      .mergeIn([key2], { isBeingEdited: false, temporaryValue: changeableValue });

    const action = cancelItemsEditing([key1, key2]);
    const actual = items(state, action);

    expect(actual).toEqual(expected);
  });

  it('ITEM_VALUE_CHANGED changes correct item', () => {
    const changeableValue = 'changed item';
    const key = 'idX';

    const mapItem = new Item({
      key,
      value: 'save item',
      isBeingEdited: true,
      temporaryValue: 'save item',
    });
    const state = new OrderedMap().set(key, mapItem);
    const expected = state.mergeIn([key], { temporaryValue: changeableValue });

    const action = changeItemValue(key, changeableValue);
    const actual = items(state, action);

    expect(actual).toEqual(expected);
  });

  it('ITEMS_GET_SUCCESS maps array of Items to new state', () => {
    const key1 = 'idX';
    const key2 = 'idY';
    const key3 = 'idZ';

    const mapItem1 = new Item({
      key: key1,
      value: 'idX item',
    });
    const mapItem2 = new Item({
      key: key2,
      value: 'idY item',
    });
    const mapItem3 = new Item({
      key: key3,
      value: 'idZ item',
    });
    const expected = new OrderedMap()
      .set(key1, mapItem1)
      .set(key2, mapItem2)
      .set(key3, mapItem3);

    const action = getItemsSuccess([mapItem1, mapItem2, mapItem3]);
    const actual = items(undefined, action);

    expect(actual).toEqual(expected);
  });

  it('undefined action returns new state', () => {
    const action = { type: undefined };
    const actual = items(undefined, action);

    expect(actual).toEqual(OrderedMap());
  });

  it('undefined action returns previous state', () => {
    const key = 'idX';

    const mapItem = new Item({
      key,
      value: 'add item',
    });
    const expected = new OrderedMap().set(key, mapItem);

    const action = { type: undefined };
    const actual = items(expected, action);

    expect(actual).toEqual(expected);
  });
});
