import {
  ADD_ITEM,
  CANCEL_EDIT,
  DELETE_ITEM,
  SAVE_ITEM,
  START_EDIT
} from '../constants/actionTypes';
import {
  addItem,
  deleteItem,
  saveItem,
  startEdit,
  cancelEdit
} from './index';
import { generateId } from '../utils/idGenerator';

describe('actions', () => {
  it('should create an action to add an item', () => {
    const itemText = 'Finish docs';
    const expectedAction = {
      type: ADD_ITEM,
      payload: {
        text: itemText
      }
    };
    expect(addItem(itemText)).toEqual(expectedAction);
  });

  it('should create an action to delete an item', () => {
    const itemId = '00000000-0000-0000-0000-000000000000';
    const expectedAction = {
      type: DELETE_ITEM,
      payload: {
        id: itemId
      }
    };
    expect(deleteItem(itemId)).toEqual(expectedAction);
  });

  it('should create an action to save an item', () => {
    const itemId = '00000000-0000-0000-0000-000000000000';
    const itemText = 'Just do it';
    const expectedAction = {
      type: SAVE_ITEM,
      payload: {
        id: itemId,
        text: itemText
      }
    };
    expect(saveItem(itemId, itemText)).toEqual(expectedAction);
  });

  it('should create an action to start editing of an item', () => {
    const itemId = '00000000-0000-0000-0000-000000000000';
    const expectedAction = {
      type: START_EDIT,
      payload: {
        id: itemId
      }
    };
    expect(startEdit(itemId)).toEqual(expectedAction);
  });

  it('should create an action to cancel editing of an item', () => {
    const itemId = '00000000-0000-0000-0000-000000000000';
    const expectedAction = {
      type: CANCEL_EDIT,
      payload: {
        id: itemId
      }
    };
    expect(cancelEdit(itemId)).toEqual(expectedAction);
  });
});
