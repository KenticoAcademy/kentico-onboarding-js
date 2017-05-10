import { IAction } from '../actions/IAction';
import {
  CREATE_ITEM,
  EDIT_ITEM, ITEM_POST_FAILED,
  ITEM_POST_SUCCESS,
  ITEMS_FETCHING_SUCCESS,
  TOGGLE_ITEM_VIEW_MODE
} from '../actions/actionTypes';
import { ItemFlags } from '../models/ItemFlags';

export const itemFlagsReducer = (state = new ItemFlags(), action: IAction): ItemFlags => {
  switch (action.type) {
    case EDIT_ITEM:
      return state.set('editMode', false) as ItemFlags;

    case CREATE_ITEM:
      return new ItemFlags({
        editMode: false
      });

    case ITEMS_FETCHING_SUCCESS:
    case ITEM_POST_SUCCESS:
    return new ItemFlags({
        editMode: false,
        isSavedInDatabase: true,
      });

    case TOGGLE_ITEM_VIEW_MODE:
      return state.updateIn(['editMode'], (actualValue => !actualValue)) as ItemFlags;

    case ITEM_POST_FAILED:
      return state.set('isSavedInDatabase', false) as ItemFlags;

    default:
      return state;
  }
};
