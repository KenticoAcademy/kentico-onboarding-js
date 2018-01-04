import { APP_FETCH_END } from '../constants/actionTypes';
import { IAction } from '../actions/IAction';

export const isFetching = (previousState: boolean = true, action: IAction): boolean => {
  switch (action.type) {
    case APP_FETCH_END:
      return false;

    default:
      return previousState;
  }
};
