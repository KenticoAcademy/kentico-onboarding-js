import { generateId } from '../utils/generateId';
import {
  ITEM_CREATED,
  ITEM_EDITED,
  ITEM_DELETED
} from './actionTypes';

export function itemCreated(text, idGenerator = generateId) {
  return {
    type: ITEM_CREATED,
    id: idGenerator(),
    text
  };
}

export function itemEdited(id, text) {
  return {
    type: ITEM_EDITED,
    id,
    text
  };
}

export function itemDeleted(id) {
  return {
    type: ITEM_DELETED,
    id
  };
}
