import { ITEM_CREATED } from '../constants/actionTypes';

export const addNewItem = (createNewId, text) => {
  const itemId = createNewId();

  return {
    type: ITEM_CREATED,
    payload: {
      itemId,
      text,
    },
  };
};
