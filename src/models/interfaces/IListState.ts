import { IItemsState } from './IItemsState';
import { FetchItemsState } from '../enums/FetchItemsState';

export interface IListState {
  items: IItemsState;
  fetchItemsState: FetchItemsState;
}
