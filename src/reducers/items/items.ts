import { item } from './item';
import {
  ITEM_ADD_STARTED,
  ITEM_ADD_SUCCEEDED,
  ITEM_SAVE_STARTED,
  ITEM_DELETE_STARTED,
  ITEM_DELETE_SUCCEEDED,
  ITEM_EDITING_MODE_CHANGED,
  ITEMS_FETCH_SUCCEEDED,
  ITEM_SAVE_SUCCEEDED,
  ITEM_ADD_FAILED,
  CLOSE_ADD_ERROR,
  CLOSE_DELETE_ERROR,
  ITEM_DELETE_FAILED, CLOSE_SAVE_ERROR, ITEM_SAVE_FAILED,
} from '../../actions/types/listActionTypes';
import { IListAction } from '../../actions/types/IListAction';
import { OrderedMap } from 'immutable';
import { ItemsState } from '../../store/types/ItemsState';

export const items = (
  state: ItemsState = OrderedMap(),
  action: IListAction,
): ItemsState => {
  switch (action.type) {
    case ITEMS_FETCH_SUCCEEDED:
      return action.payload.items;

    case ITEM_ADD_SUCCEEDED: {
      const itemFromState = state.get(action.payload.id);
      const updatedItem = item(itemFromState, action);

      return state
        .set(updatedItem.id, updatedItem)
        .delete(action.payload.id);
    }

    case ITEM_ADD_STARTED:
    case CLOSE_SAVE_ERROR:
    case ITEM_SAVE_STARTED: {
      const updatedItem = item(undefined, action);

      return state.set(action.payload.id, updatedItem);
    }

    case ITEM_DELETE_SUCCEEDED:
    case CLOSE_ADD_ERROR:
      return state.delete(action.payload.id);

    case ITEM_DELETE_STARTED:
    case ITEM_SAVE_FAILED:
    case ITEM_SAVE_SUCCEEDED:
    case ITEM_ADD_FAILED:
    case CLOSE_DELETE_ERROR:
    case ITEM_DELETE_FAILED:
    case ITEM_EDITING_MODE_CHANGED: {
      const itemFromState = state.get(action.payload.id);
      const updatedItem = item(itemFromState, action);

      return state.set(action.payload.id, updatedItem);
    }

    default:
      return state;
  }
};
