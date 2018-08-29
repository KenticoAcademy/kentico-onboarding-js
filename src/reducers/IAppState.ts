import { OrderedMap } from 'immutable';
import { Item } from '../models/Item';
import { ItemId } from '../models/ItemId';
import { statusType } from './items/status';

export interface IAppState {
  items: {
    byId: OrderedMap<ItemId, Item>;
    newItemText: string;
    status: statusType;
  };
}
