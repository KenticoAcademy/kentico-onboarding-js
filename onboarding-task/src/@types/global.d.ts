import { IAction } from '../actions/IAction';

declare global {
  type dispatchAction = (action: IAction) => IAction;
  type dispatchThunk = (thunkAction: ((dispatch: dispatchAction) => Promise<IAction>)) => Promise<IAction>;
  type Dispatch = dispatchThunk & dispatchAction;
}
