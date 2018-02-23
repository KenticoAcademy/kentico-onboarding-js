import {
  AxiosResponse,
  AxiosError
} from 'axios';
import { Dispatch } from 'react-redux';
import { Uuid } from '../../utils/generateId';
import { IAction } from '../IAction';
import { IAppState } from '../../models/IAppState';
import { NO_CONNECTION } from '../../constants/connection';

interface UpdateItemArguments {
  id: Uuid;
  text: string;
}

interface IUpdateDependencies {
  readonly updateItem: (args: UpdateItemArguments) => IAction;
  readonly putSuccess: (id: Uuid) => IAction;
  readonly putError: (args: { id: Uuid, message: string }) => IAction;
  readonly axiosPut: (data: {id: Uuid, text: string}) => Promise<AxiosResponse>;
}

export const putItemFactory =
  ({updateItem, putSuccess, putError, axiosPut}: IUpdateDependencies) =>
    ({id, text}: {id: Uuid, text: string}) =>
      (dispatch: Dispatch<IAppState>): Promise<void | IAction> => {
        dispatch(updateItem({
          id,
          text
        }));

        return axiosPut({id, text})
          .then((response: AxiosResponse) =>
            dispatch(putSuccess(
              response.data.id,
            )))
          .catch((error: AxiosError) => {
            const errorResponse = error.response;
            if (errorResponse !== undefined) {
              dispatch(putError(
                {
                  id,
                  message: errorResponse.statusText
                }));
            } else {
              dispatch(putError(
                {
                  id,
                  message: NO_CONNECTION
                }));
            }
          });
      };
