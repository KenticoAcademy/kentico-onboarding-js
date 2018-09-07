import {
  DELETE_ITEM,
  EDIT_ITEM
} from '../actions/actionTypes';

export const item = (state, action) => {
  switch (action.type) {
    case EDIT_ITEM:
      return (
        state
          .setIn([action.payload.id, 'text'], action.payload.text)
      );

    case DELETE_ITEM:
      return (
        state
          .filter(actualItem => actualItem.id !== action.payload.id)
      );

    default:
      return state;
  }
};
