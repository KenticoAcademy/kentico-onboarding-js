import { OrderedMap } from 'immutable';
import { TodoListAction } from '../../actions/types/TodoListAction';
import {
  ListItem_Delete_Error,
  ListItem_Delete_Response,
  ListItem_Post_Error,
  ListItem_Post_Response, ListItem_Put_Error, ListItem_Put_Response,
} from '../../constants/todoActionTypes';

export const failedActions = (state = OrderedMap<Guid, TodoListAction>(), action: TodoListAction): OrderedMap<Guid, TodoListAction> => {
  switch (action.type) {
    case ListItem_Post_Response:
    case ListItem_Delete_Response:
    case ListItem_Put_Response: {
      return state.delete(action.payload.id);
    }
    case ListItem_Post_Error:
    case ListItem_Delete_Error:
    case ListItem_Put_Error: {
      return state.set(action.payload.id, action.payload.failedAction);
    }
    default:
      return state;
  }
};
