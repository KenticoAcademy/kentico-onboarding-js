import {
  ListItem_GetAll_Error,
  ListItem_GetAll_Response,
} from '../../constants/todoActionTypes';
import { TodoListAction } from '../../actions/types/TodoListAction';

export const hasError = (state: boolean = false, action: TodoListAction): boolean => {
  switch (action.type) {
    case ListItem_GetAll_Error: {
      return true;
    }
    case ListItem_GetAll_Response: {
      return false;
    }
    default:
      return state;
  }
};
