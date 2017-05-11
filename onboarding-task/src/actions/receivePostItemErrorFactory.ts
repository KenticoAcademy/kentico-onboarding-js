import { ITEM_POST_FAILED } from './actionTypes';
import { IAction } from './IAction';

export const receivePostItemErrorFactory = (generateId: () => string) =>
  (error: Error, itemUeid: string): IAction => ({
    type: ITEM_POST_FAILED,
    payload: {
      id: generateId(),
      itemUeid,
      message: error.message,
    },
  });
