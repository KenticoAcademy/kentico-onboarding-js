import { TodoListAction } from '../types/TodoListAction';
import {
  ListItem_Delete_Error,
  ListItem_Delete_Request,
  ListItem_Delete_Response
} from '../../constants/todoActionTypes';


export interface IDeleteDependencies {
  readonly deleteFromServer: (id: Guid) => Promise<Response>;
}

export const deleteItemActionCreator = (dep: IDeleteDependencies) =>
  (id: Guid) =>
    async (dispatch: ListDispatch): Promise<TodoListAction> => {
      const deleteRequest = removeItem(id);
      try {
        dispatch(deleteRequest);
        const response: Response = await dep.deleteFromServer(id);
        if (!response.ok) {
          return dispatch(removeItemFailed(id, deleteRequest));
        }
        return dispatch(removeItemSucceeded(id));
      } catch {
        return dispatch(removeItemFailed(id, deleteRequest));
      }
    };

export const removeItem = (id: Guid): TodoListAction => ({
  type: ListItem_Delete_Request,
  payload: {
    id,
  }
});

export const removeItemSucceeded = (id: Guid): TodoListAction => ({
  type: ListItem_Delete_Response,
  payload: {
    id,
  }
});

export const removeItemFailed = (id: Guid, failedAction: TodoListAction): TodoListAction => ({
  type: ListItem_Delete_Error,
  payload: {
    id,
    failedAction,
  }
});
