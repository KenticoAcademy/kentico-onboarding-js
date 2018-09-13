import { OrderedMap } from 'immutable';
import { Item } from '../models/Item';
import { ItemId } from '../models/ItemId';
import { StatusType } from '../models/Status';

export interface IAppState {
  items: {
    byId: OrderedMap<ItemId, Item>;
    newItemText: string;
    status: StatusType;
  };
}
