import {
  AxiosResponse,
  AxiosError
} from 'axios';
import { IAppState } from '../../models/IAppState';
import { Dispatch } from 'react-redux';
import { IAction } from '../IAction';
import { Uuid } from '../../utils/generateId';
import { IDependencies } from '../IDependencies';
import { NO_CONNECTION } from '../../constants/connection';

interface InsertItemArguments {
  text: string;
  id: Uuid;
  isSynchronized: boolean;
}

interface PostSuccessArguments extends InsertItemArguments {
  newId: Uuid;
}

interface IPostDependencies extends IDependencies {
  readonly postSuccess: (args: PostSuccessArguments) => IAction;
  readonly postError: (id: Uuid, errorMessage: string) => IAction;
  readonly insertItem: (args: InsertItemArguments) => IAction;
  readonly generateId: () => Uuid;
}

export const postItemFactory =
  ({insertItem, generateId, postSuccess, postError, getAxios}: IPostDependencies) =>
    (text: string) =>
      (dispatch: Dispatch<IAppState>): Promise<void | IAction> => {
        const tempId = generateId();
        dispatch(insertItem({
          text,
          id: tempId,
          isSynchronized: false
        }));

        return getAxios.axios.post(getAxios.url, {text})
          .then((response: AxiosResponse) => dispatch(postSuccess({
            newId: response.data.id,
            id: tempId,
            text: response.data.text,
            isSynchronized: true
          })))
          .catch((error: AxiosError) => {
            const errorResponse = error.response;
            if (errorResponse !== undefined) {
              dispatch(postError(
                tempId,
                errorResponse.status + ' ' + errorResponse.statusText
              ));
            } else {
              dispatch(postError(
                tempId,
                NO_CONNECTION
              ));
            }
          });
      };
