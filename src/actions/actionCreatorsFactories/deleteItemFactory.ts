import { AxiosResponse } from 'axios';
import { Dispatch } from 'react-redux';
import { IAppState } from '../../models/IAppState';
import { IAction } from '../IAction';
import { Uuid } from '../../utils/generateId';
import {
  NO_CONNECTION,
  OPERATION_FAILED
} from '../../constants/connection';
import {
  DELETE_ITEM_ERROR,
  DELETE_ITEM_SUCCESS,
  TODO_LIST_ITEM_DELETE
} from '../../constants/actionTypes';

interface IDeleteDependencies {
  readonly axiosDelete: (id: Uuid) => Promise<AxiosResponse>;
}

export const deleteItem = (id: Uuid): IAction => ({
  type: TODO_LIST_ITEM_DELETE,
  payload: {
    id,
  },
});

export const deleteSuccess = (id: Uuid): IAction => ({
  type: DELETE_ITEM_SUCCESS,
  payload: {
    id
  }
});

export const deleteError = (id: Uuid, message: string): IAction => ({
  type: DELETE_ITEM_ERROR,
  payload: {
    id,
    message
  }
});

export const deleteItemFactory =
  ({axiosDelete}: IDeleteDependencies) =>
    (id: Uuid) => async (dispatch: Dispatch<IAppState>): Promise<IAction> => {
      dispatch(deleteItem(id));

      try {
        await axiosDelete(id);

        return dispatch(deleteSuccess(id));
      } catch (error) {
        const errorResponse = error.response;
        const message =
          errorResponse === undefined
            ? NO_CONNECTION
            : OPERATION_FAILED;

        return dispatch(deleteError(id, message));
      }
    };
