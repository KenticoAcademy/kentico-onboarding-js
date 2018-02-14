import { ItemsState } from './ItemsState';
import { FetchItemsState } from '../enums/FetchItemsState';

export interface IListState {
  items: ItemsState;
  fetchItemsState: FetchItemsState;
}
