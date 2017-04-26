import { IAction } from '../actions/IAction';
import {
  CREATE_ITEM,
  EDIT_ITEM,
  RECEIVE_ITEM_CREATED,
  RECEIVE_ITEMS,
  TOGGLE_ITEM_VIEW_MODE
} from '../actions/actionTypes';
import { ItemFlags } from '../models/ItemFlags';

const itemFlagsReducer = (state = new ItemFlags(),
                          action: IAction,) => {
  switch (action.type) {
    case EDIT_ITEM:
      return state.set('editMode', false) as ItemFlags;

    case CREATE_ITEM:
      return new ItemFlags({
        editMode: false
      });

    case RECEIVE_ITEMS:
    case RECEIVE_ITEM_CREATED:
    return new ItemFlags({
        editMode: false
      });

    case TOGGLE_ITEM_VIEW_MODE:
      return state.updateIn(['editMode'], (actualValue => !actualValue)) as ItemFlags;

    default:
      return state;
  }
};

export { itemFlagsReducer };
