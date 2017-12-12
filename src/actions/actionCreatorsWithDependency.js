import { ITEM_CREATED } from '../constants/actionTypes';

export const addNewItem = (createNewId, text) => ({
  type: ITEM_CREATED,
  payload: {
    itemId: createNewId(),
    text,
  },
});
