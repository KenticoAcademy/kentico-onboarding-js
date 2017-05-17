import { IAction } from '../actions/IAction';

type dispatchAction = (action: IAction) => IAction;
type dispatchThunk = (thunkAction: ((dispatch: dispatchAction) => Promise<IAction>)) => Promise<IAction>;
export type Dispatch = dispatchThunk & dispatchAction;
