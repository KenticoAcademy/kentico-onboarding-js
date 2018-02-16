import { ItemsState } from './ItemsState';
import { FetchItemsState } from '../enums/FetchItemsState';
import { ItemsSyncInfoState } from './ItemsSyncInfoState';

export interface IListState {
  fetchItemsState: FetchItemsState;
  items: ItemsState;
  itemsSyncInfo: ItemsSyncInfoState;
}
