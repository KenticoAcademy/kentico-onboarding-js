import { IAction } from '../actions/IAction';
import { ThunkAction } from 'redux-thunk';
import { IStoreState } from '../reducers/IStoreState';

declare global {
  type Guid = string;
  type Thunk = ThunkAction<Promise<IAction>, IStoreState, any>;
}
