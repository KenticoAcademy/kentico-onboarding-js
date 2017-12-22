import { IItemsState } from './IItemsState';
import { FetchItemsState } from './FetchItemsState';

export interface IListState {
  items: IItemsState;
  fetchItemsState: FetchItemsState;
}
