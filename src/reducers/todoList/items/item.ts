import { ListItem } from '../../../models/ListItem';
import {
  ITEM_START_EDITING,
  ITEM_STOP_EDITING,
  ITEM_TEXT_UPDATE
} from '../../../constants/actionTypes';

export const item = (state = ListItem(), action) => {
  switch (action.type) {
    case ITEM_START_EDITING:
      return state.merge({
        id: action.payload.id,
        isInEditMode: true
      });

    case ITEM_STOP_EDITING:
      return state.merge({
        id: action.payload.id,
        isInEditMode: false
      });

    case ITEM_TEXT_UPDATE:
      return state.merge({
        id: action.payload.id,
        isInEditMode: false,
        text: action.payload.text
      });

    default:
      return state;
  }
};
