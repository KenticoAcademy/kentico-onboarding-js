import { OrderedMap, Map } from 'immutable';
import { Item } from '../../models/Item';
import {
  actionTypes
} from '../../constants/actionTypes';
import { IAction } from '../../actions/IAction';

const DEFAULT_STATE: Map<string, Record<string, any>> = OrderedMap();

export const byId = (state = DEFAULT_STATE, action: IAction): OrderedMap<string, Record<string, any>> => {

  switch (action.type) {

    case actionTypes.ADD_ITEM:
      return state.set(action.payload.id, new Item({
        id: action.payload.id,
        text: action.payload.text,
      }));

    case actionTypes.UPDATE_ITEM_TEXT:
      return state.update(action.payload.id, (item) => item.merge({
        text: item.textUpdate,
        isBeingEdited: false,
      }));

    case actionTypes.DELETE_ITEM: {
      return state.delete(action.payload.id);
    }

    case actionTypes.TOGGLE_EDITING: {
      return state.update(action.payload.id, (item) => item.merge({
        isBeingEdited: !item.isBeingEdited,
        textUpdate: item.text,
      }));
    }

    case actionTypes.TEXT_UPDATE_CHANGE: {
      return state.update(action.payload.id, (item) => item.merge({
        textUpdate: action.payload.updatedText,
      }));
    }

    default:
      return state;
  }
};
