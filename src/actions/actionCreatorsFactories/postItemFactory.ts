import { AxiosResponse } from 'axios';
import { IAppState } from '../../models/IAppState';
import { Dispatch } from 'react-redux';
import { IAction } from '../IAction';
import { defaultId, Uuid } from '../../utils/generateId';
import {
  ITEM_INSERT_FAILED,
  ITEM_INSERT_SUCCEEDED,
  TODO_LIST_ITEM_INSERT
} from '../../constants/actionTypes';
import { closeItemError } from '../actionCreators';

interface IPostDependencies {
  readonly generateId: () => Uuid;
  readonly axiosPost: (text: string) => Promise<AxiosResponse>;
  readonly getErrorMessage: (errorResponse: AxiosResponse) => string;
}

export const insertItem =
  (item: { text: string, id: Uuid, isSynchronized: boolean }): IAction => ({
    type: TODO_LIST_ITEM_INSERT,
    payload: item,
  });

export const postSucceeded =
  (newId: Uuid, item: { id: Uuid, text: string, isSynchronized: boolean }): IAction => ({
    type: ITEM_INSERT_SUCCEEDED,
    payload: {
      newId,
      ...item
    }
  });

export const postFailed = (item: { id: Uuid, text: string }, message: string): IAction => ({
  type: ITEM_INSERT_FAILED,
  payload: {
    item,
    message,
  }
});

export const postItemFactory =
  ({generateId, axiosPost, getErrorMessage}: IPostDependencies) =>
    ({text, id}: {text: string, id: Uuid}) =>
      async (dispatch: Dispatch<IAppState>): Promise<IAction> => {
        let tempId = id;
        if (id === defaultId) {
          tempId = generateId();
          dispatch(insertItem({
            text,
            id: tempId,
            isSynchronized: false
          }));
        } else {
          dispatch(closeItemError(tempId));
        }

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
          const message = getErrorMessage(error.response);

          return dispatch(postFailed(
            {
              id: tempId,
              text
            },
            message
          ));
        }
      };
