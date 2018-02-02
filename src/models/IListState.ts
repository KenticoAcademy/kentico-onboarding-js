import { IItemsState } from './IItemsState';
import { FetchItemsState } from './FetchItemsState';
import { Message } from './Message';

export interface IListState {
  items: IItemsState;
  fetchItemsState: FetchItemsState;
  message: Message;
}
