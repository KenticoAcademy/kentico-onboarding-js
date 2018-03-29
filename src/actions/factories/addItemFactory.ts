import { ITEM_ADD } from '../../constants/actionTypes';

export const addItemFactory = (generateItemKey) => (newValue) => ({
  type: ITEM_ADD,
  payload: {
    itemKey: generateItemKey(),
    newValue,
  },
});
