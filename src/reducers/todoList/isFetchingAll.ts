import {
  ListItem_GetAll_Error,
  ListItem_GetAll_Request,
  ListItem_GetAll_Response,
  ListItem_ToggleEdited,
  ListItem_Post_Request,
  ListItem_Delete_Request, ListItem_Put_Request
} from '../../constants/todoActionTypes';
import { TodoListAction } from '../../actions/types/TodoListAction';

export const isFetchingAll = (state: boolean = true, action: TodoListAction): boolean => {
  switch (action.type) {
    case ListItem_Delete_Request:
    case ListItem_ToggleEdited:
    case ListItem_Put_Request:
    case ListItem_GetAll_Response:
    case ListItem_GetAll_Error:
    case ListItem_Post_Request: {
      return false;
    }
    case ListItem_GetAll_Request: {
      return true;
    }
    default:
      return state;
  }
};
