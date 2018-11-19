import { ThunkAction } from 'redux-thunk';
import { Actions } from '../actions/types/itemsActionTypes';
import { IAppState } from '../store/state/IAppState';

declare global {
  type Guid = string;
  type Fetch = (input: string, init: RequestInit) => Promise<Response>;
  type Thunk<TReturn = Promise<Actions>, TState = IAppState> = ThunkAction<TReturn, TState, void, Actions>;
}
