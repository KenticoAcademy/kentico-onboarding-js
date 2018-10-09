import { ADD_ITEM } from '../constants/actionTypes';

export const addItemFactory = (idGenerator) =>
  (text) => ({
    type: ADD_ITEM,
    payload: {
      id: idGenerator(),
      text,
    }
  });
