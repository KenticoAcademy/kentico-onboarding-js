import { AxiosResponse } from 'axios';
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
  readonly axiosPut: (data: { id: Uuid, text: string }) => Promise<AxiosResponse>;
}

export const putItemFactory =
  ({updateItem, putSuccess, putError, axiosPut}: IUpdateDependencies) =>
    ({id, text}: { id: Uuid, text: string }) =>
      async (dispatch: Dispatch<IAppState>): Promise<IAction> => {
        dispatch(updateItem({
          id,
          text
        }));

        try {
          const response = await axiosPut({id, text});

          return dispatch(putSuccess(response.data.id));
        } catch (error) {
          const message =
            error.response === undefined
              ? NO_CONNECTION
              : error.response.statusText;

          return dispatch(putError({id, message}));
        }
      };
