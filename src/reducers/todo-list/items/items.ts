import { OrderedMap } from 'immutable';
import {
  TODO_LIST_ITEM_INSERT,
  TODO_LIST_ITEM_DELETE,
  TODO_LIST_ITEM_UPDATE,
  TODO_LIST_ITEM_CANCEL_EDIT,
  TODO_LIST_ITEM_EDIT,
  ITEM_INSERT_SUCCEEDED,
  ITEM_UPDATE_SUCCEEDED,
  ITEM_DELETION_SUCCEEDED,
  ITEM_UPDATE_FAILED,
  ITEM_DELETION_FAILED,
  ITEM_ERROR_CLOSE, ITEM_INSERT_FAILED,
} from '../../../constants/actionTypes';
import { item } from './item';
import { IAction } from '../../../actions/IAction';
import { ListItem } from '../../../models/ListItem';
import { Uuid } from '../../../utils/generateId';

export const items = (previousState: OrderedMap<Uuid, ListItem> = OrderedMap<Uuid, ListItem>(), action: IAction): OrderedMap<Uuid, ListItem> => {
  switch (action.type) {
    case ITEM_INSERT_SUCCEEDED:
      const newState = previousState.delete(action.payload.id);

      return newState
        .update(action.payload.newId, existingItem => item(existingItem, action));

    case ITEM_DELETION_SUCCEEDED:
      return previousState.delete(action.payload.id);

    case TODO_LIST_ITEM_INSERT:
    case TODO_LIST_ITEM_UPDATE:
    case TODO_LIST_ITEM_EDIT:
    case TODO_LIST_ITEM_CANCEL_EDIT:
    case TODO_LIST_ITEM_DELETE:
    case ITEM_INSERT_FAILED:
    case ITEM_DELETION_FAILED:
    case ITEM_UPDATE_SUCCEEDED:
    case ITEM_UPDATE_FAILED:
    case ITEM_ERROR_CLOSE: {
      return previousState
        .update(action.payload.id, existingItem => item(existingItem, action));
    }

    default:
      return previousState;
  }
};
