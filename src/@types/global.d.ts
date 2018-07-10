import { IAction } from '../actions/types/IAction';
import { IState } from '../store/IState';
import { ThunkAction as ReduxThunkAction } from 'redux-thunk';

declare global {
  type Key = string;
  type ThunkAction = ReduxThunkAction<Promise<IAction>, IState, {}>;
}
