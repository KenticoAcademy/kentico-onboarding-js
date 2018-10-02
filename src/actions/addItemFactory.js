import { ADD_ITEM } from '../constants/actionTypes';

export const addItemFactory = (generateIdFunction) =>
  (text) => ({
    type: ADD_ITEM,
    payload: {
      id: generateIdFunction(),
      text,
    }
  });
