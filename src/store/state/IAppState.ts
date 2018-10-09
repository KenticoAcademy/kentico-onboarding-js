import { IItemsState } from './IItemsState';
import { IErrorsState } from './IErrorsState';

interface IListState {
  readonly items: IItemsState;
  readonly itemErrors: IErrorsState;
  readonly isLoading: boolean;
  readonly error: string;
}

export interface IAppState {
  readonly list: IListState;
}
