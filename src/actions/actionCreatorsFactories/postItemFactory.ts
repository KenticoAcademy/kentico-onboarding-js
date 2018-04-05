import { AxiosResponse } from 'axios';
import { IAppState } from '../../models/IAppState';
import { Dispatch } from 'react-redux';
import { IAction } from '../IAction';
import { Uuid } from '../../utils/generateId';
import { NO_CONNECTION } from '../../constants/connection';
import {
  ITEM_INSERT_FAILED,
  ITEM_INSERT_SUCCEEDED,
  TODO_LIST_ITEM_INSERT
} from '../../constants/actionTypes';

interface IPostDependencies {
  readonly generateId: () => Uuid;
  readonly axiosPost: (text: string) => Promise<AxiosResponse>;
}

export const insertItem =
  (item: {text: string, id: Uuid, isSynchronized: boolean}): IAction => ({
    type: TODO_LIST_ITEM_INSERT,
    payload: item,
  });

export const postSucceeded =
  (newId: Uuid, item: {id: Uuid, text: string, isSynchronized: boolean}): IAction => ({
    type: ITEM_INSERT_SUCCEEDED,
    payload: {
      newId,
      ...item
    }
  });

export const postFailed = (id: Uuid, message: string): IAction => ({
  type: ITEM_INSERT_FAILED,
  payload: {
    id,
    message
  }
});

export const postItemFactory =
  ({generateId, axiosPost}: IPostDependencies) =>
    (text: string) =>
      async (dispatch: Dispatch<IAppState>): Promise<IAction> => {
        const tempId = generateId();
        dispatch(insertItem({
          text,
          id: tempId,
          isSynchronized: false
        }));

        try {
          const response = await axiosPost(text);

          return dispatch(postSucceeded(
            response.data.id,
            {
              id: tempId,
              text: response.data.text,
              isSynchronized: true
            }
          ));
        } catch (error) {
          const errorResponse = error.response;
          const message =
            errorResponse === undefined
              ? NO_CONNECTION
              : `${errorResponse.status} ${errorResponse.statusText}`;

          return dispatch(postFailed(tempId, message));
        }
      };
