import { CREATE_ITEM } from './actionTypes';

export const createItemFactory = generateId => text =>
  ({
    type: CREATE_ITEM,
    payload: {
      id: generateId(),
      text,
    }
  });
