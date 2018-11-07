import { IItemsState } from './IItemsState';
import { IErrorsState } from './IErrorsState';

interface IListState {
  readonly items: IItemsState;
  readonly itemErrors: IErrorsState;
  readonly isLoading: boolean;
  readonly error: string | null;
}

export interface IAppState {
  readonly list: IListState;
}
