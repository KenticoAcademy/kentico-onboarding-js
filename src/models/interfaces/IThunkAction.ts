import { ThunkAction } from 'redux-thunk';
import { IAction } from './IAction';
import { IAppState } from './IAppState';

export interface IThunkAction {
  (...args: any[]): ThunkAction<Promise<IAction>, IAppState, {}>;
}

