import { IListState } from './IListState';

export interface IAppState {
  list: IListState;
  registeredAction: () => void;
}
