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
        ... state.slice(0, action.index - 1),
        {
          id: action.id,
          text: action.text,
          isBeingEdited: false,
        }, ...state.slice(action.index + 1),
      ];
    case DELETE_ITEM: {
      state.splice(0, 1);
      return state;
    }
    case TOGGLE_EDITING: {
      console.log(state);
      const index = state.indexOf(state.find(item => item.id === action.id));
      return [...state.slice(0, index),
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
