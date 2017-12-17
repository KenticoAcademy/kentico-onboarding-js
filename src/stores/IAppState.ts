import { OrderedMap } from 'immutable';
import { Item } from '../models/Item';

export interface IAppState {
  items: {
    byId: OrderedMap<string, Item>;
    newItemText: string;
  };
}
