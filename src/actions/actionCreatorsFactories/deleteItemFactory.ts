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
  ITEM_DELETION_FAILED,
  ITEM_DELETION_SUCCEEDED,
  TODO_LIST_ITEM_DELETE
} from '../../constants/actionTypes';

interface IDeleteDependencies {
  readonly axiosDelete: (id: Uuid) => Promise<AxiosResponse>;
  readonly generateId: () => Uuid;
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

export const deletionFailed = (id: Uuid, error: { errorId: Uuid, message: string }): IAction => ({
  type: ITEM_DELETION_FAILED,
  payload: {
    id,
    ...error
  }
});

export const deleteItemFactory =
  ({axiosDelete, generateId}: IDeleteDependencies) =>
    (id: Uuid) => async (dispatch: Dispatch<IAppState>): Promise<IAction> => {
      dispatch(deleteItem(id));

      try {
        await axiosDelete(id);

        return dispatch(deletionSucceeded(id));
      } catch (error) {
        const errorResponse = error.response;
        const message =
          errorResponse === undefined
            ? NO_CONNECTION
            : OPERATION_FAILED;

        return dispatch(deletionFailed(
          id,
          {
            errorId: generateId(),
            message
          })
        );
      }
    };
