import { ThunkAction } from 'redux-thunk';
import { IAction } from './IAction';
import { IAppState } from '../state/IAppState';

export interface IThunkAction<TActionParams> {
  (params: TActionParams): ThunkAction<Promise<IAction>, IAppState, {}>;
}

