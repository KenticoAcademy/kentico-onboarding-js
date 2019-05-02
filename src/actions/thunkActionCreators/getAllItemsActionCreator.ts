import {
  ListItem_GetAll_Error,
  ListItem_GetAll_Request,
  ListItem_GetAll_Response
} from '../../constants/todoActionTypes';
import { ListItem } from '../../models/ListItem';
import { List } from 'immutable';
import { TodoListAction } from '../types/TodoListAction';

export interface IGetDependencies {
  readonly getFromServer: () => Promise<Response>;
}

export const getAllItemsActionCreator = (deps: IGetDependencies) =>
  () =>
    async (dispatch: ListDispatch): Promise<TodoListAction> => {
      dispatch(getAllItems());
      const response: Response = await deps.getFromServer();
      if (!response.ok) {
        return dispatch(getAllItemsFailed());
      }
      const items = getItemsFromResponse(response);
      return dispatch(getAllItemsSucceeded(await items));
    };

const getAllItems = (): TodoListAction => ({
  type: ListItem_GetAll_Request,
  payload: {}
});

const getAllItemsSucceeded = (items: List<ListItem>): TodoListAction => ({
  type: ListItem_GetAll_Response,
  payload: {
    items
  }
});

const getAllItemsFailed = (): TodoListAction => ({
  type: ListItem_GetAll_Error,
  payload: {}
});

const getItemsFromResponse = async (response: Response): Promise<List<ListItem>> => {
  const jsonDataArray: Array<FetchedItem> = await response.json();
  return List(jsonDataArray.map(
    (item: FetchedItem) =>
      new ListItem({
        id: item.id,
        text: item.text,
        isFetching: false,
        isEdited: false,
      })
  ));
};
