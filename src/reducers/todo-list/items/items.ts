import { OrderedMap } from 'immutable';
import {
  TODO_LIST_ITEM_INSERT,
  TODO_LIST_ITEM_DELETE,
  TODO_LIST_ITEM_UPDATE,
  TODO_LIST_ITEM_CANCEL_EDIT,
  TODO_LIST_ITEM_EDIT, NEW_ITEM_PERSISTED, UPDATED_ITEM_PERSISTED, DELETE_ITEM_SUCCESSFUL,
} from '../../../constants/actionTypes';
import { item } from './item';
import { IAction } from '../../../actions/IAction';
import { ListItem } from '../../../models/ListItem';
import { Uuid } from '../../../utils/generateId';

export const items = (previousState: OrderedMap<Uuid, ListItem> = OrderedMap<Uuid, ListItem>(), action: IAction): OrderedMap<Uuid, ListItem> => {
  switch (action.type) {
    case DELETE_ITEM_SUCCESSFUL:
      return previousState.delete(action.payload.id);

    case NEW_ITEM_PERSISTED:
      const newState = previousState.delete(action.payload.id);

      return newState
        .update(action.payload.newId, existingItem => item(existingItem, action));

    case TODO_LIST_ITEM_DELETE:
    case UPDATED_ITEM_PERSISTED:
    case TODO_LIST_ITEM_INSERT:
    case TODO_LIST_ITEM_UPDATE:
    case TODO_LIST_ITEM_EDIT:
    case TODO_LIST_ITEM_CANCEL_EDIT: {
      return previousState
        .update(action.payload.id, existingItem => item(existingItem, action));
    }

    default:
      return previousState;
  }
};
