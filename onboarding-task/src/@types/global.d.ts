import { IAction } from '../actions/IAction';

type dispatchAction = (action: IAction) => IAction;
type dispatchThunk = (thunkAction: ((dispatch: dispatchAction) => Promise<IAction>)) => Promise<IAction>;

declare global {
  type Dispatch = dispatchThunk & dispatchAction;
  type Fetch = (input: Request | string, init?: RequestInit) => Promise<Response>;
}
