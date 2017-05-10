import { IAction } from './IAction';
import { ITEMS_FETCHING_FAILED } from './actionTypes';

export const receiveItemsFetchingErrorFactory = (generateId: () => string) =>
  (error: Error): IAction => ({
    type: ITEMS_FETCHING_FAILED,
    payload: {
      id: generateId(),
      message: error.message,
    },
  });
