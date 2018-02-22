import {
  AxiosResponse,
  AxiosError
} from 'axios';
import { Dispatch } from 'react-redux';
import { Uuid } from '../../utils/generateId';
import { IAction } from '../IAction';
import { IAppState } from '../../models/IAppState';
import { NO_CONNECTION } from '../../constants/connection';
import { AxiosStatic } from 'axios';

interface UpdateItemArguments {
  id: Uuid;
  text: string;
}

interface IUpdateDependencies {
  readonly updateItem: (args: UpdateItemArguments) => IAction;
  readonly putSuccess: (id: Uuid) => IAction;
  readonly putError: (args: { id: Uuid, message: string }) => IAction;
  readonly getAxios: {axios: AxiosStatic | any, url: string};
}

export const putItemFactory =
  ({updateItem, putSuccess, putError, getAxios}: IUpdateDependencies) =>
    ({id, text}: {id: Uuid, text: string}) =>
      (dispatch: Dispatch<IAppState>): Promise<void | IAction> => {
        dispatch(updateItem({
          id,
          text
        }));

        return getAxios.axios.put(getAxios.url + '/' + id, {id, text})
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
