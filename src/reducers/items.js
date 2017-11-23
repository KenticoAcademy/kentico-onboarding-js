import {
  ADD_ITEM,
  UPDATE_ITEM_TEXT,
  DELETE_ITEM,
  TOGGLE_EDITING,
} from '../constants/actionTypes';

const items = (state = [], action) => {
  const index = state.indexOf(state.find(item => item.id === action.id));
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
        ... state.slice(0, index),
        {
          id: action.id,
          text: action.text,
          isBeingEdited: false,
        }, ...state.slice(index + 1),
      ];

    case DELETE_ITEM: {
      return [
        ...state.slice(0, index),
        ...state.slice(index + 1),
      ];
    }

    case TOGGLE_EDITING: {
      return [
        ...state.slice(0, index),
        {
          id: action.id,
          text: state[index].text,
          isBeingEdited: action.isBeingEdited,
        },
        ...state.slice(index + 1),
      ];
    }

    default:
      return state;
  }
};

export default items;
