import { generateId } from '../utils/generateId';
import {
  ITEM_CREATED,
  ITEM_EDITED,
  ITEM_DELETED
} from './actionTypes';

export const itemCreated = (text) => (
  {
    type: ITEM_CREATED,
    payload: {
      id: generateId(),
      text,
    }
  }
);

export const itemEdited = (id, text) => (
  {
    type: ITEM_EDITED,
    payload: {
      id,
      text,
    }
  }
);

export const itemDeleted = (id) => (
  {
    type: ITEM_DELETED,
    payload: {
      id,
    }
  }
);
