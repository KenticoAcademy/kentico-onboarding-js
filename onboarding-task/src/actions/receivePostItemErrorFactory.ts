import { ITEM_SAVE_FAILED } from './actionTypes';
import { IAction } from './IAction';

export const receivePostItemErrorFactory = (generateId: () => string) =>
  (error: Error, itemUeid: string): IAction => ({
    type: ITEM_SAVE_FAILED,
    payload: {
      id: generateId(),
      itemUeid,
      message: error.message,
    },
  });
