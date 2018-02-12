import {
  TODO_LIST_ITEM_UPDATE,
  TODO_LIST_ITEM_INSERT,
  TODO_LIST_ITEM_EDIT,
  TODO_LIST_ITEM_CANCEL_EDIT, ITEM_POST_SUCCESS, ITEM_PUT_SUCCESS, TODO_LIST_ITEM_DELETE,
  ITEM_PUT_ERROR, ITEM_DELETE_FAILED, CLOSE_ITEM_ERROR,
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

    case ITEM_POST_SUCCESS:
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

    case ITEM_PUT_SUCCESS: {
      const updatedItem = {
        isSynchronized: true,
        errorMessage: ''
      };

      return previousState.with(updatedItem);
    }

    case ITEM_PUT_ERROR: {
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

    case ITEM_DELETE_FAILED: {
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
