import { actionTypes } from '../../constants/actionTypes';

export const requestFailed = (errorMessage: string) => ({
  type: actionTypes.REQUEST_FAILED,
  payload: {
    errorMessage,
  }
});
