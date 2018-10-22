import { OrderedMap } from 'immutable';
import {
  ADD_ITEM,
  ITEM_STOP_EDITING,
  ITEM_DELETE,
  ITEM_START_EDITING,
  ITEM_TEXT_UPDATE,
} from '../../../constants/actionTypes';
import { item } from './item';
import { ListItem } from '../../../models/ListItem';
import { IAction } from '../../../actions/IAction';

type ItemsState = OrderedMap<Uuid, ListItem>;

export const items = (state = OrderedMap<Uuid, ListItem>(), action: IAction): ItemsState => {
  switch (action.type) {
    case ADD_ITEM: {
      const newItem = new ListItem({
        id: action.payload.id,
        text: action.payload.text,
      });

      return state.set(action.payload.id, newItem);
    }

    case ITEM_DELETE:
      return state.delete(action.payload.id);

    case ITEM_START_EDITING:
    case ITEM_STOP_EDITING:
    case ITEM_TEXT_UPDATE: {
      const initialItem = state.get(action.payload.id);
      const updatedItem = item(initialItem, action);
      return state.mergeIn([action.payload.id], updatedItem);
    }

    default:
      return state;
  }
};
