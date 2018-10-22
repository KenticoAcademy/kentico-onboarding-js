import { ListItem } from '../../../models/ListItem';
import {
  ITEM_START_EDITING,
  ITEM_STOP_EDITING,
  ITEM_TEXT_UPDATE,
} from '../../../constants/actionTypes';
import { IAction } from '../../../actions/IAction';

export const item = (state: ListItem = new ListItem(), action: IAction): ListItem => {
  switch (action.type) {
    case ITEM_START_EDITING:
      return state.with({
        id: action.payload.id,
        isInEditMode: true,
      });

    case ITEM_STOP_EDITING:
      return state.with({
        id: action.payload.id,
        isInEditMode: false,
      });

    case ITEM_TEXT_UPDATE:
      return state.with({
        id: action.payload.id,
        isInEditMode: false,
        text: action.payload.text,
      });

    default:
      return state;
  }
};
