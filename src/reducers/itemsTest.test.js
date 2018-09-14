import { OrderedMap } from 'immutable';
import {
  ADD_ITEM,
  CANCEL_EDIT,
  DELETE_ITEM,
  SAVE_ITEM,
  START_EDIT
} from '../constants/actionTypes';
import { ListItem } from '../models/ListItem';
import { items } from './items.js';
import { generateId } from '../utils/idGenerator';
import { initialState } from '../models/initialState';

describe('items reducer', () => {
  it('should return the initial state', () => {
    expect(
      items(undefined, {})
    ).toEqual(OrderedMap());
  });

  it('should return previous state on unknown action', () => {
    const itemId = generateId();
    const input = initialState;

    const result = items(input, {
      type: 'UNKNOWN_ACTION',
      payload: {
        text: 'Run the tests',
        id: itemId
      }
    });

    expect(input).toEqual(result);
  });

  it('should handle ADD_ITEM', () => {
    const itemId = generateId();
    const input = OrderedMap([
      [
        itemId,
        new ListItem({
          id: itemId,
          text: 'Run the tests'
        })
      ]
    ]);

    const result = items(OrderedMap(), {
      type: ADD_ITEM,
      payload: {
        text: 'Run the tests',
        id: itemId
      }
    });

    expect(input).toEqual(result);
  });

  it('should handle DELETE_ITEM', () => {
    const itemId = generateId();
    const input = items(OrderedMap(
      [
        [
          itemId,
          new ListItem({
            id: itemId,
            text: 'Buy Milk',
          })
        ]
      ]), {
      type: DELETE_ITEM,
      payload: {
        id: itemId
      }
    }
    );

    const result = OrderedMap();

    expect(input).toEqual(result);
  });

  it('should handle START_EDIT', () => {
    const itemId = generateId();
    const input = items(OrderedMap(
      [
        [
          itemId,
          new ListItem({
            id: itemId,
            text: 'Buy Milk',
          })
        ]
      ]), {
      type: START_EDIT,
      payload: {
        id: itemId
      }
    }
    );

    const result = OrderedMap([
      [
        itemId,
        new ListItem({
          id: itemId,
          text: 'Buy Milk',
          isInEditMode: true
        })
      ]
    ]);

    expect(input).toEqual(result);
  });

  it('should handle CANCEL_EDIT', () => {
    const itemId = generateId();
    const input = items(OrderedMap(
      [
        [
          itemId,
          new ListItem({
            id: itemId,
            text: 'Buy Milk',
          })
        ]
      ]), {
      type: CANCEL_EDIT,
      payload: {
        id: itemId
      }
    }
    );

    const result = OrderedMap([
      [
        itemId,
        new ListItem({
          id: itemId,
          text: 'Buy Milk',
          isInEditMode: false
        })
      ]
    ]);

    expect(input).toEqual(result);
  });

  it('should handle SAVE_ITEM', () => {
    const itemId = generateId();
    const newText = 'Buy Beer';

    const input = items(OrderedMap(
      [
        [
          itemId,
          new ListItem({
            id: itemId,
            text: 'Buy Milk',
          })
        ]
      ]), {
      type: SAVE_ITEM,
      payload: {
        id: itemId,
        text: newText
      }
    }
    );

    const result = OrderedMap([
      [
        itemId,
        new ListItem({
          id: itemId,
          text: newText,
        })
      ]
    ]);

    expect(input).toEqual(result);
  });
});
