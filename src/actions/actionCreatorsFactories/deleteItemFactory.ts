import { AxiosResponse } from 'axios';
import { Dispatch } from 'react-redux';
import { IAppState } from '../../models/IAppState';
import { IAction } from '../IAction';
import { Uuid } from '../../utils/generateId';
import {
  ITEM_DELETION_FAILED,
  ITEM_DELETION_SUCCEEDED,
  TODO_LIST_ITEM_DELETE
} from '../../constants/actionTypes';
import { IListItem } from '../../models/ListItem';

interface IDeleteDependencies {
  readonly axiosDelete: (id: Uuid) => Promise<AxiosResponse>;
  readonly getErrorMessage: (errorResponse: AxiosResponse) => string;
}

export const deleteItem = (id: Uuid): IAction => ({
  type: TODO_LIST_ITEM_DELETE,
  payload: {
    id,
  },
});

export const deletionSucceeded = (id: Uuid): IAction => ({
  type: ITEM_DELETION_SUCCEEDED,
  payload: {
    id
  }
});

export const deletionFailed = (item: IListItem, message: string): IAction => ({
  type: ITEM_DELETION_FAILED,
  payload: {
    item,
    message
  }
});

export const deleteItemFactory =
  ({axiosDelete, getErrorMessage}: IDeleteDependencies) =>
    (id: Uuid) => async (dispatch: Dispatch<IAppState>, getState: () => IAppState): Promise<IAction> => {
      dispatch(deleteItem(id));

      try {
        await axiosDelete(id);

        return dispatch(deletionSucceeded(id));
      } catch (error) {
        const item = getState().todoList.items.get(id);
        const message = getErrorMessage(error.response);

        return dispatch(deletionFailed(
          item,
          message
          )
        );
      }
    };
