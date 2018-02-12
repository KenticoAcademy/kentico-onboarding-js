import {
  TODO_LIST_ITEM_UPDATE,
  TODO_LIST_ITEM_INSERT,
  TODO_LIST_ITEM_EDIT,
  TODO_LIST_ITEM_CANCEL_EDIT, NEW_ITEM_PERSISTED, UPDATED_ITEM_PERSISTED, TODO_LIST_ITEM_DELETE,
  ITEM_UPDATE_FAILED, DELETE_ITEM_FAILED, CLOSE_ITEM_ERROR,
} from '../../../constants/actionTypes';
import { ListItem } from '../../../models/ListItem';
import { IAction } from '../../../actions/IAction';

export const item = (previousState: ListItem, action: IAction): ListItem => {
  switch (action.type) {
    case TODO_LIST_ITEM_EDIT:
    case TODO_LIST_ITEM_CANCEL_EDIT: {
      const updatedItem = {
        isEdited: !previousState.isEdited,
      };

      return previousState.with(updatedItem);
    }

    case TODO_LIST_ITEM_INSERT:
      return new ListItem({
        id: action.payload.id,
        text: action.payload.text,
        isEdited: false,
        isSynchronized: action.payload.isSynchronized
      });

    case NEW_ITEM_PERSISTED:
      return new ListItem({
        id: action.payload.newId,
        text: action.payload.text,
        isEdited: false,
        isSynchronized: true
      });

    case TODO_LIST_ITEM_UPDATE: {
      const updatedItem = {
        text: action.payload.text,
        backupText: previousState.text,
        isEdited: false,
        isSynchronized: false
      };

      return previousState.with(updatedItem);
    }

    case UPDATED_ITEM_PERSISTED: {
      const updatedItem = {
        isSynchronized: true,
        errorMessage: ''
      };

      return previousState.with(updatedItem);
    }

    case ITEM_UPDATE_FAILED: {
      const updatedItem = {
        isSynchronized: true,
        text: previousState.backupText,
        errorMessage: action.payload.message
      };

      return previousState.with(updatedItem);
    }

    case TODO_LIST_ITEM_DELETE: {
      const updatedItem = {
        isEdited: false,
        isSynchronized: false
      };

      return previousState.with(updatedItem);
    }

    case DELETE_ITEM_FAILED: {
      const updatedItem = {
        isSynchronized: true,
        errorMessage: action.payload.message
      };

      return previousState.with(updatedItem);
    }

    case CLOSE_ITEM_ERROR: {
      const updatedItem = {
        errorMessage: ''
      };

      return previousState.with(updatedItem);
    }

    default:
      return previousState;
  }
};
