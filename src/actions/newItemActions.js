import {
  NEW_ITEM_CHANGED,
  NEW_ITEM_CHANGE_CANCEL,
} from '../utils/constants';

export const changeValue = (updatedValue) => ({
  type: NEW_ITEM_CHANGED,
  updatedValue,
});

export const cancelChange = () => ({
  type: NEW_ITEM_CHANGE_CANCEL,
});
