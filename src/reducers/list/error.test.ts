import { OrderedMap } from 'immutable';

import {
  addItemFailed,
  getItemsFailed,
  saveItemFailed,
  deleteItemFailed,
  saveItemSuccess,
  deleteItemSuccess,
} from '../../actions';
import {
  ERROR_ADD_ITEM,
  ERROR_GET_ITEMS,
  ERROR_SAVE_ITEM,
  ERROR_DELETE_ITEM, GUID_GLOBAL_ERROR,
} from '../../constants/constants';
import { error as errorReducer } from './error';
import { Key } from '../../@types/Key';
import { actionTypes } from '../../constants/actionTypes';

describe('error reducer works correctly', () => {
  it('ITEMS_GET_FAILED returns state with error', () => {
    const errorDetail = 'item error detail';
    const state = OrderedMap<Key, string>().set('x', 'error');
    const expected = state.set(GUID_GLOBAL_ERROR, ERROR_GET_ITEMS + ' (' + errorDetail + ')');

    const action = getItemsFailed(errorDetail);
    const actual = errorReducer(state, action);

    expect(actual).toEqual(expected);
  });

  it('ITEM_ADD_FAILED returns preserve state with new item error', () => {
    const errorDetail = 'item error detail';
    const key = 'keyI';
    const state = OrderedMap<Key, string>().set('x', 'error');
    const expected = state.set(key, ERROR_ADD_ITEM + ' (' + errorDetail + ')');

    const action = addItemFailed(key, errorDetail);
    const actual = errorReducer(state, action);

    expect(actual).toEqual(expected);
  });

  it('ITEM_SAVE_FAILED returns preserve state with new item error', () => {
    const errorDetail = 'item error detail';
    const key = 'keyI';
    const state = OrderedMap<Key, string>().set('x', 'error');
    const expected = state.set(key, ERROR_SAVE_ITEM + ' (' + errorDetail + ')');

    const action = saveItemFailed(key, errorDetail);
    const actual = errorReducer(state, action);

    expect(actual).toEqual(expected);
  });


  it('ITEM_DELETE_FAILED returns preserve state with new item error', () => {
    const errorDetail = 'item error detail';
    const key = 'keyI';
    const state = OrderedMap<Key, string>().set('x', 'error');
    const expected = state.set(key, ERROR_DELETE_ITEM + ' (' + errorDetail + ')');

    const action = deleteItemFailed(key, errorDetail);
    const actual = errorReducer(state, action);

    expect(actual).toEqual(expected);
  });


  it('ITEM_SAVE_SUCCESS returns preserve state without specified item error', () => {
    const errorDetail = 'item error detail';
    const key = 'keyI';
    const state = OrderedMap<Key, string>().set('x', 'error').set(key, ERROR_DELETE_ITEM + ' (' + errorDetail + ')');
    const expected = state.delete(key);

    const action = saveItemSuccess(key);
    const actual = errorReducer(state, action);

    expect(actual).toEqual(expected);
  });

  it('ITEM_DELETE_SUCCESS returns preserve state without specified item error', () => {
    const errorDetail = 'item error detail';
    const key = 'keyI';
    const state = OrderedMap<Key, string>().set('x', 'error').set(key, ERROR_DELETE_ITEM + ' (' + errorDetail + ')');
    const expected = state.delete(key);

    const action = deleteItemSuccess(key);
    const actual = errorReducer(state, action);

    expect(actual).toEqual(expected);
  });

  it('undefined action returns default state', () => {
    const action = { type: actionTypes.ITEM_VALUE_CHANGED, payload: undefined };
    const actual = errorReducer(undefined, action);

    expect(actual).toEqual(OrderedMap<Key, string>());
  });

  it('undefined action returns previous state', () => {
    const state = OrderedMap<Key, string>().set('xy', 'error 1');

    const action = { type: actionTypes.ITEM_VALUE_CHANGED, payload: undefined };
    const actual = errorReducer(state, action);

    expect(actual).toEqual(state);
  });
});
