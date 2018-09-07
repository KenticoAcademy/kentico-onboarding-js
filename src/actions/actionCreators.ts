import { Action } from './actionInterface';
import { generateId } from '../utils/generateId';
import {
  EDIT_ITEM,
  DELETE_ITEM,
} from './actionTypes';
import { createItemFactory } from './actionCreatorsFactory';

export const createItem = createItemFactory(generateId);

export const editItem = (id: string, text: string): Action => ({
  type: EDIT_ITEM,
  payload: {
    id,
    text,
  },
});

export const deleteItem = (id: string): Action => ({
  type: DELETE_ITEM,
  payload: {
    id,
  },
});
