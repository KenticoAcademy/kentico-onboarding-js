import { ItemsState } from './ItemsState';
import { FetchItemsState } from '../enums/FetchItemsState';

export interface IListState {
  fetchItemsState: FetchItemsState;
  items: ItemsState;
}
