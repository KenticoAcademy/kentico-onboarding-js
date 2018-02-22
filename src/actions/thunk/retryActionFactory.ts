import { Dispatch } from 'redux';
import { IAction } from '../../models/interfaces/IAction';
import {
  IThunkAction,
  IThunkActionWithoutParams
} from '../../models/interfaces/IThunkAction';
import { IAppState } from '../../models/state/IAppState';

export const retryActionFactory = () =>
  <T>(asyncAction: IThunkAction<T>) =>
  (asyncActionParams: T) =>
    (dispatch: Dispatch<IAction>, getState: () => IAppState, extraArgument: any) =>
      asyncAction(asyncActionParams)(dispatch, getState, extraArgument);

export const retryActionWithoutParamsFactory = () =>
  (asyncAction: IThunkActionWithoutParams) =>
      (dispatch: Dispatch<IAction>, getState: () => IAppState, extraArgument: any) =>
        asyncAction()(dispatch, getState, extraArgument);
