import { ListItem } from '../../../models/classes/ListItem';
import { IAction } from '../../../models/interfaces/IAction';
import {
  ITEM_DELETE_START,
  ITEM_TOGGLE,
  ITEM_UPDATE_REVERT,
  ITEM_UPDATE_START,
  ITEM_UPDATE_SUCCESS,
} from '../../../constants/actionTypes';

export const item = (state: ListItem, { type, payload }: IAction): ListItem => {
  switch (type) {
    case ITEM_UPDATE_START: {
      return state.with({
        text: payload.item.text,
        isBeingEdited: false,
      });
    }
    case ITEM_TOGGLE: {
      return state.with({ isBeingEdited: !state.isBeingEdited });
    }
    case ITEM_DELETE_START: {
      return state.with({ isBeingEdited: false });
    }
    case ITEM_UPDATE_SUCCESS: {
      return state.with({ syncedText: state.text });
    }
    case ITEM_UPDATE_REVERT: {
      return state.with({ text: state.syncedText });
    }
    default:
      return state;
  }
};

