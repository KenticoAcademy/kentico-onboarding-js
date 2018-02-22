import { ThunkAction } from 'redux-thunk';
import { IAction } from './IAction';
import { IAppState } from '../state/IAppState';

type AppThunkAction = ThunkAction<Promise<IAction>, IAppState, {}>;

export interface IThunkAction<TActionParams> {
  (params: TActionParams): AppThunkAction;
}

export interface IThunkActionWithoutParams {
  (): AppThunkAction;
}

