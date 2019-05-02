import { ListItem } from '../../models/ListItem';
import { TodoListAction } from '../types/TodoListAction';
import {
  ListItem_Post_Error, ListItem_Post_Request,
  ListItem_Post_Response
} from '../../constants/todoActionTypes';

export interface IPostDependencies {
  readonly postToServer: (text: string) => Promise<Response>;
}

export const postItemActionCreator = (dep: IPostDependencies) =>
  (text: string, generatingIdFunction: () => Guid) =>
    async (dispatch: ListDispatch): Promise<TodoListAction> => {
      const id = generatingIdFunction();
      const postRequest = addNewItem(text, id);
      try {
        dispatch(postRequest);
        const response: Response = await dep.postToServer(text);
        if (!response.ok) {
          return dispatch(addItemFailed(id, postRequest));
        }
        const newItem = getItemFromResponse(response);
        return dispatch(addItemSucceeded(await newItem, id));
      } catch {
        return dispatch(addItemFailed(id, postRequest));
      }
    };


export const addNewItem = (text: string, id: Guid): TodoListAction => ({
  type: ListItem_Post_Request,
  payload: {
    item: new ListItem({
        id,
        text,
        isFetching: true,
        isEdited: false,
      }
    )
  }
});


const addItemSucceeded = (item: ListItem, previousId: Guid): TodoListAction => ({
  type: ListItem_Post_Response,
  payload: {
    item,
    previousId,
  }
});

const addItemFailed = (id: Guid, failedAction: TodoListAction): TodoListAction => ({
  type: ListItem_Post_Error,
  payload: {
    id,
    failedAction
  }
});


const getItemFromResponse = async (response: Response): Promise<ListItem> => {
  const jsonData: FetchedItem = await response.json();
  return new ListItem({
    id: jsonData.id,
    text: jsonData.text,
    isFetching: false,
    isEdited: false,
  });
};

