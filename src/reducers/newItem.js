import {
  ITEM_ADD,
  NEW_ITEM_CHANGED,
  NEW_ITEM_CHANGE_CANCEL,
} from '../utils/constants';

const DEFAULT_STATE = '';

export const newItem = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case NEW_ITEM_CHANGED:
      return action.updatedValue;

    case ITEM_ADD:
    case NEW_ITEM_CHANGE_CANCEL:
      return DEFAULT_STATE;

    default:
      return state;
  }
};
