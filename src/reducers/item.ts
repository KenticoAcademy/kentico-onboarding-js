import {
  SAVE_ITEM,
  TOGGLE_EDITED
} from '../constants/todoActionTypes';
import { ListItemRecord } from '../models/ListItemRecord';
import { actionInterface } from '../actions/actionInterface';

export const item = (state = new ListItemRecord(), action: actionInterface) => {
  switch (action.type) {
    case TOGGLE_EDITED: {
      return state.merge({
        isEdited: !state.isEdited
      });
    }
    case SAVE_ITEM: {
      return state.merge({
        isEdited: false,
        text: action.payload.text
      });
    }
    default:
      return state;
  }
};
