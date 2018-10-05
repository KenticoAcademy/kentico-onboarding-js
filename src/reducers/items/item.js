import { ListItem } from '../../models/ListItem';
import {
  START_EDITING,
  STOP_EDITING,
  UPDATE_TEXT
} from '../../constants/actionTypes';

export const item = (state = ListItem(), action) => {
  switch (action.type) {
    case START_EDITING:
      return state.merge({
        id: action.payload.id,
        isInEditMode: true
      });

    case STOP_EDITING:
      return state.merge({
        id: action.payload.id,
        isInEditMode: false
      });

    case UPDATE_TEXT:
      return state.merge({
        id: action.payload.id,
        isInEditMode: false,
        text: action.payload.text
      });

    default:
      return state;
  }
};
