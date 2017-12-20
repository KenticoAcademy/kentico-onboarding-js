import { ITEM_CREATED } from '../constants/actionTypes';

export const addNewItemFactory = createNewId => text => ({
  type: ITEM_CREATED,
  payload: {
    itemId: createNewId(),
    text,
  },
});
