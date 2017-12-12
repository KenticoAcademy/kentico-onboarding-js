import { OrderedMap } from 'immutable';
import { IItem } from '../models/Item';

export interface IAppState {
  items: {
    byId: OrderedMap<string, Record<string, IItem>>;
    newItemText: string;
  };
}
