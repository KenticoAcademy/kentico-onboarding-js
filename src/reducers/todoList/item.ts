import {
  ListItem_ToggleEdited,
  ListItem_Post_Response,
  ListItem_Post_Error,
  ListItem_Delete_Request,
  ListItem_Delete_Error,
  ListItem_Put_Response,
  ListItem_Put_Error,
  ListItem_Put_Request,
} from '../../constants/todoActionTypes';
import { ListItem } from '../../models/ListItem';
import { TodoListAction } from '../../actions/types/TodoListAction';


export const item = (state: ListItem = new ListItem(), action: TodoListAction): ListItem => {
  switch (action.type) {
    case ListItem_ToggleEdited: {
      return state.with({
        isEdited: !state.isEdited
      });
    }
    case ListItem_Put_Request: {
      return state.with({
        isEdited: false,
        text: action.payload.text,
        isFetching: true,
      });
    }
    case ListItem_Delete_Request: {
      return state.with({
        isEdited: false,
        isFetching: true,
      });
    }
    case ListItem_Post_Response:
    case ListItem_Post_Error:
    case ListItem_Delete_Error:
    case ListItem_Put_Response:
    case ListItem_Put_Error: {
      return state.with({
        isFetching: false,
      });
    }
    default:
      return state;
  }
};
