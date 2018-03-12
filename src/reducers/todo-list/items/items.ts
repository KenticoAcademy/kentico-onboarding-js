import { OrderedMap } from 'immutable';
import {
  TODO_LIST_ITEM_INSERT,
  TODO_LIST_ITEM_DELETE,
  TODO_LIST_ITEM_UPDATE,
  TODO_LIST_ITEM_CANCEL_EDIT,
  TODO_LIST_ITEM_EDIT, POST_ITEM_SUCCESS, PUT_ITEM_SUCCESS, DELETE_ITEM_SUCCESS,
  PUT_ITEM_ERROR, DELETE_ITEM_ERROR, CLOSE_PUT_DELETE_ERROR, POST_ITEM_ERROR,
} from '../../../constants/actionTypes';
import { item } from './item';
import { IAction } from '../../../actions/IAction';
import { ListItem } from '../../../models/ListItem';
import { Uuid } from '../../../utils/generateId';

export const items = (previousState: OrderedMap<Uuid, ListItem> = OrderedMap<Uuid, ListItem>(), action: IAction): OrderedMap<Uuid, ListItem> => {
  switch (action.type) {
    case POST_ITEM_SUCCESS:
      const newState = previousState.delete(action.payload.id);

      return newState
        .update(action.payload.newId, existingItem => item(existingItem, action));

    case DELETE_ITEM_SUCCESS:
    case POST_ITEM_ERROR:
      return previousState.delete(action.payload.id);

    case TODO_LIST_ITEM_INSERT:
    case TODO_LIST_ITEM_UPDATE:
    case TODO_LIST_ITEM_EDIT:
    case TODO_LIST_ITEM_CANCEL_EDIT:
    case TODO_LIST_ITEM_DELETE:
    case DELETE_ITEM_ERROR:
    case PUT_ITEM_SUCCESS:
    case PUT_ITEM_ERROR:
    case CLOSE_PUT_DELETE_ERROR: {
      return previousState
        .update(action.payload.id, existingItem => item(existingItem, action));
    }

    default:
      return previousState;
  }
};
