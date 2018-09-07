import { Action } from './actionInterface';
import { CREATE_ITEM } from './actionTypes';

export const createItemFactory = (generateId: () => string) => (text: string): Action =>
  ({
    type: CREATE_ITEM,
    payload: {
      id: generateId(),
      text,
    },
  });
