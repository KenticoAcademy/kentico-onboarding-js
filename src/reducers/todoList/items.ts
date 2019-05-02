import { OrderedMap } from 'immutable';
import {
  ListItem_ToggleEdited,
  ListItem_GetAll_Response,
  ListItem_Post_Request,
  ListItem_Post_Error,
  ListItem_Post_Response,
  ListItem_Delete_Response,
  ListItem_Delete_Error,
  ListItem_Delete_Request,
  ListItem_Put_Request,
  ListItem_Put_Error,
  ListItem_Put_Response,
} from '../../constants/todoActionTypes';
import { item } from './item';
import { ListItem } from '../../models/ListItem';
import { TodoListAction } from '../../actions/types/TodoListAction';


export const items = (state = OrderedMap<string, ListItem>(), action: TodoListAction): OrderedMap<string, ListItem> => {
  switch (action.type) {
    case ListItem_GetAll_Response: {
      return OrderedMap<Guid, ListItem>(action.payload.items.map((listItem: ListItem) => {
        return [listItem.id, listItem];
      }));
    }
    case ListItem_Post_Request: {
      return state.set(action.payload.item.id, action.payload.item);
    }
    case ListItem_Post_Response: {
      return state
        .delete(action.payload.previousId)
        .set(action.payload.item.id, action.payload.item);
    }
    case ListItem_Post_Error:
    case ListItem_Delete_Error:
    case ListItem_Delete_Request:
    case ListItem_Put_Error: {
      const itemFromDb = state.get(action.payload.id);
      const editedLoading = item(itemFromDb, action);
      return state.set(action.payload.id, editedLoading);
    }
    case ListItem_Delete_Response: {
      return state.delete(action.payload.id);
    }
    case ListItem_ToggleEdited: {
      const itemToEdit = state.get(action.payload.id);
      const editedItem = item(itemToEdit, action);
      return state.update(action.payload.id, () => editedItem);
    }
    case ListItem_Put_Response: {
      const itemFromDb = state.get(action.payload.id);
      const editedLoading = item(itemFromDb, action);
      return state.set(action.payload.id, editedLoading);
    }
    case ListItem_Put_Request: {
      const itemToEdit = state.get(action.payload.id);
      const editedItem = item(itemToEdit, action);
      return state.update(action.payload.id, () => editedItem);
    }
    default:
      return state;
  }
};
