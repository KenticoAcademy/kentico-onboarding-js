import { IAction } from '../actions/IAction';

// export type Dispatch =
//   ((action: IAction) => IAction)
//   & ((dispatch: Dispatch) => Promise<IAction>);

type dispatchAction = (action: IAction) => IAction;
type dispatchThunk = (thunkAction: ((dispatch: dispatchAction) => Promise<IAction>)) => Promise<IAction>;
export type Dispatch = dispatchThunk & dispatchAction;

// export type Dispatch = (action: IAction | Dispatch) => IAction | Promise<IAction>;

// export type Dispatch = (action: IAction | Dispatch1) => IAction;
// type Dispatch1 = (action: IAction | Dispatch1) => Promise<IAction> ;
