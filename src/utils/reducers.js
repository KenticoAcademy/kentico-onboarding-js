import {
  ADD_ITEM,
  UPDATE_ITEM_TEXT,
  DELETE_ITEM,
  TOGGLE_EDITING,
} from '../constants/actionTypes';

const items = (state = [], action) => {
  switch (action.type) {
    case ADD_ITEM:
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          isBeingEdited: false,
        },
      ];
    case UPDATE_ITEM_TEXT:
      return [
        ...state.slice(0, action.index - 1),
        {
          id: action.id,
          text: action.text,
          isBeingEdited: false,
        }, ...state.slice(action.index + 1),
      ];
    case DELETE_ITEM:
      return [
        ...state.slice(0, action.index - 1),
        ...state.slice(action.index + 1),
      ];
    case TOGGLE_EDITING:
      return [
        ...state.slice(0, action.index - 1),
        {
          ...action,
          isBeingEdited: !action.isBeingEdited,
        }, ...state.slice(action.index + 1),
      ];
    default:
      return state;
  }
};

export default items;
