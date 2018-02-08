import { IItemsState } from './IItemsState';
import { FetchItemsState } from '../enums/FetchItemsState';
import { Message } from '../classes/Message';

export interface IListState {
  items: IItemsState;
  fetchItemsState: FetchItemsState;
  message: Message;
}
