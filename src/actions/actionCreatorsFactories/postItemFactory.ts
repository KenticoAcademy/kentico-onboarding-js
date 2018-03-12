import { AxiosResponse } from 'axios';
import { IAppState } from '../../models/IAppState';
import { Dispatch } from 'react-redux';
import { IAction } from '../IAction';
import { Uuid } from '../../utils/generateId';
import { NO_CONNECTION } from '../../constants/connection';

interface InsertItemArguments {
  text: string;
  id: Uuid;
  isSynchronized: boolean;
}

interface PostSuccessArguments extends InsertItemArguments {
  newId: Uuid;
}

interface IPostDependencies {
  readonly postSuccess: (args: PostSuccessArguments) => IAction;
  readonly postError: (args: { id: Uuid, message: string }) => IAction;
  readonly insertItem: (args: InsertItemArguments) => IAction;
  readonly generateId: () => Uuid;
  readonly axiosPost: (data: { text: string }) => Promise<AxiosResponse>;
}

export const postItemFactory =
  ({insertItem, generateId, postSuccess, postError, axiosPost}: IPostDependencies) =>
    (text: string) =>
      async (dispatch: Dispatch<IAppState>): Promise<IAction> => {
        const tempId = generateId();
        dispatch(insertItem({
          text,
          id: tempId,
          isSynchronized: false
        }));

        try {
          const response = await axiosPost({text});

          return dispatch(postSuccess({
            newId: response.data.id,
            id: tempId,
            text: response.data.text,
            isSynchronized: true
          }));
        } catch (error) {
          const errorResponse = error.response;
          const message =
            errorResponse === undefined
              ? NO_CONNECTION
              : `${errorResponse.status} ${errorResponse.statusText}`;

          return dispatch(postError({id: tempId, message}));
        }
      };
