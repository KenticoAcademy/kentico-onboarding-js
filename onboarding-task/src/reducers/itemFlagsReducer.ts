import { IAction } from '../actions/IAction';
import {
  POSITIVELY_CREATE_ITEM_LOCALLY,
  EDIT_ITEM, ITEM_POST_FAILED,
  ITEM_POST_SUCCEED,
  ITEMS_FETCHING_SUCCEED,
  TOGGLE_ITEM_VIEW_MODE
} from '../actions/actionTypes';
import { ItemFlags } from '../models/ItemFlags';

export const itemFlagsReducer = (state = new ItemFlags(), action: IAction): ItemFlags => {
  switch (action.type) {
    case EDIT_ITEM:
      return state.set('editMode', false) as ItemFlags;

    case POSITIVELY_CREATE_ITEM_LOCALLY:
      return new ItemFlags({
        editMode: false
      });

    case ITEM_POST_SUCCEED:
      return state.set('isSavedInDatabase', true) as ItemFlags;

    case ITEMS_FETCHING_SUCCEED:
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
