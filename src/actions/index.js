import { ITEM_ADD } from '../utils/constants';

export const addItem = (newItemKey, newItemValue) => ({
  type: ITEM_ADD,
  item: {
    key: newItemKey,
    value: newItemValue,
  },
});
