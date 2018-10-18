import {
  OrderedMap,
} from 'immutable';
import {Item} from '../models/Item';
import {StatusType} from '../models/Status';


export interface IItemsState {
  byId: OrderedMap<ItemId, Item>;
  newItemText: string;
  status: StatusType;
}

export interface IAppState {
  items: IItemsState;
}
