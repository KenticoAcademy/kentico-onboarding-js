import { IItemsState } from './IItemsState';

interface IListState {
  readonly items: IItemsState;
  readonly isLoading: boolean;
  readonly error: string;
}

export interface IAppState {
  readonly list: IListState;
}
