import {
  ADD_ITEM,
  UPDATE_NEW_ITEM_TEXT,
} from '../../constants/actionTypes.ts';

const DEFAULT_VALUE = '';

export const newItemText = (state = DEFAULT_VALUE, action) => {
  switch (action.type) {
    case UPDATE_NEW_ITEM_TEXT:
      return action.payload.newItemText;
    case ADD_ITEM:
      return DEFAULT_VALUE;
    default:
      return state;
  }
};

