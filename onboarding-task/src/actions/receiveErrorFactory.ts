import { IAction } from './IAction';
import { RECEIVE_ERROR } from './actionTypes';


const receiveError = (generateId: () => string, error: Error): IAction => ({
  type: RECEIVE_ERROR,
  payload: { id: generateId(), error },
});

export const receiveErrorFactory = (generateId: () => string) =>
  (error: Error): IAction => receiveError(generateId, error);
