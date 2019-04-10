import { ListItem } from '../../models/ListItem';
import {
  CLOSE_DELETE_ERROR,
  CLOSE_SAVE_ERROR,
  ITEM_ADD_FAILED,
  ITEM_ADD_STARTED,
  ITEM_ADD_SUCCEEDED,
  ITEM_DELETE_FAILED,
  ITEM_DELETE_STARTED,
  ITEM_EDITING_MODE_CHANGED,
  ITEM_SAVE_FAILED,
  ITEM_SAVE_STARTED,
  ITEM_SAVE_SUCCEEDED,
} from '../../actions/types/listActionTypes';
import { IListAction } from '../../actions/types/IListAction';

export const item = (state: ListItem = new ListItem(), action: IListAction): ListItem => {
  switch (action.type) {
    case ITEM_ADD_SUCCEEDED:
      return state
        .with({id: action.payload.fetchedId, isUpdating: false});

    case ITEM_DELETE_STARTED:
      return state
        .with({isUpdating: true, isEdited: false});

    case ITEM_SAVE_SUCCEEDED:
    case CLOSE_DELETE_ERROR:
      return state
        .with({isUpdating: false});

    case ITEM_EDITING_MODE_CHANGED:
      return state
        .with({isEdited: !state.isEdited});

    case ITEM_ADD_FAILED:
    case ITEM_SAVE_FAILED:
    case ITEM_DELETE_FAILED:
      return state
        .with({isEdited: false, isUpdating: false});

    case ITEM_ADD_STARTED:
    case ITEM_SAVE_STARTED:
    case CLOSE_SAVE_ERROR:
      return new ListItem({...action.payload});

    default:
      return state;
  }
};
