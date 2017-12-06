import { ITEM_CREATED } from '../actionTypes';

export const addNewItem = (createNewId, { text }) => {
  const itemId = createNewId();

  return {
    type: ITEM_CREATED,
    itemId,
    text,
  };
};
