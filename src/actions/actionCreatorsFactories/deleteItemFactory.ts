import {
  AxiosResponse,
  AxiosError
} from 'axios';
import { Dispatch } from 'react-redux';
import { IAppState } from '../../models/IAppState';
import { IAction } from '../IAction';
import { Uuid } from '../../utils/generateId';
import { NO_CONNECTION, OPERATION_FAILED } from '../../constants/connection';

interface IDeleteDependencies {
  readonly deleteItem: (id: Uuid) => IAction;
  readonly deleteSuccess: (id: Uuid) => IAction;
  readonly deleteError: (args: { id: Uuid, message: string }) => IAction;
  readonly axiosDelete: (id: Uuid) => Promise<AxiosResponse>;
}

export const deleteItemFactory =
  ({deleteItem, deleteSuccess, deleteError, axiosDelete}: IDeleteDependencies) =>
    (id: Uuid) => (dispatch: Dispatch<IAppState>): Promise<void | IAction> => {
      dispatch(deleteItem(id));

      return axiosDelete(id)
        .then(() => dispatch(deleteSuccess(id)))
        .catch((error: AxiosError) => {
          const errorResponse = error.response;
          if (errorResponse !== undefined) {
            dispatch(deleteError(
              {
                id,
                message: OPERATION_FAILED
              }));
          } else {
            dispatch(deleteError(
              {
                id,
                message: NO_CONNECTION
              }));
          }
        });
    };
