import { IAction } from './IAction';
import { ITEMS_FETCHING_FAILED } from './actionTypes';


const receiveItemsFetchingError = (generateId: () => string, error: Error): IAction => ({
  type: ITEMS_FETCHING_FAILED,
  payload: {
    id: generateId(),
    message: error,
  },
});

export const receiveItemsFetchingErrorFactory = (generateId: () => string) =>
  (error: Error): IAction => receiveItemsFetchingError(generateId, error);
