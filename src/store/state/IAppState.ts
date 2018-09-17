import { IItemsState } from './IItemsState';

interface IListState {
  readonly items: IItemsState;
  readonly isLoading: boolean;
}

export interface IAppState {
  readonly list: IListState;
}
