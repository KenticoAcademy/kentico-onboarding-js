import { TodoListAction } from '../types/TodoListAction';
import {
  ListItem_Put_Error, ListItem_Put_Request,
  ListItem_Put_Response,
} from '../../constants/todoActionTypes';

export interface IPutDependencies {
  readonly putToServer: (id: Guid, text: string) => Promise<Response>;
}

export const putItemActionCreator = (dep: IPutDependencies) =>
  (id: Guid, text: string) =>
    async (dispatch: ListDispatch): Promise<TodoListAction> => {
      const putRequest = editItem(id, text);
      try {
        dispatch(putRequest);
        const response: Response = await dep.putToServer(id, text);
        if (!response.ok) {
          return dispatch(editItemFailed(id, putRequest));
        }
        return dispatch(editItemWasSucceeded(id));
      } catch {
        return dispatch(editItemFailed(id, putRequest));
      }
    };

export const editItem = (id: Guid, text: string): TodoListAction => ({
  type: ListItem_Put_Request,
  payload: {
    id,
    text
  }
});

const editItemWasSucceeded = (id: Guid): TodoListAction => ({
  type: ListItem_Put_Response,
  payload: {
    id,
  }
});

const editItemFailed = (id: Guid, failedAction: TodoListAction): TodoListAction => ({
  type: ListItem_Put_Error,
  payload: {
    id,
    failedAction,
  }
});
