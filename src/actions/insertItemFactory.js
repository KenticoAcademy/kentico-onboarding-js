import { TODO_LIST_ITEM_INSERT } from '../constants/actionTypes';

export const insertItemFactory = generateId =>
  text => ({
    type: TODO_LIST_ITEM_INSERT,
    payload: {
      id: generateId(),
      text,
    },
  });
