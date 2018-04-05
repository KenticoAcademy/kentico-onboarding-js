import { AxiosResponse } from 'axios';
import { Dispatch } from 'react-redux';
import { IAppState } from '../../models/IAppState';
import { IAction } from '../IAction';
import { Uuid } from '../../utils/generateId';
import { NO_CONNECTION, OPERATION_FAILED } from '../../constants/connection';

interface IDeleteDependencies {
  readonly deleteItem: (id: Uuid) => IAction;
  readonly deleteSuccess: (id: Uuid) => IAction;
  readonly deleteError: (id: Uuid, message: string) => IAction;
  readonly axiosDelete: (id: Uuid) => Promise<AxiosResponse>;
}

export const deleteItemFactory =
  ({deleteItem, deleteSuccess, deleteError, axiosDelete}: IDeleteDependencies) =>
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
