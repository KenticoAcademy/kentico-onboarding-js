import { OrderedMap } from 'immutable';
import { Item } from '../models/Item';

export interface IState {
  readonly list: { items: OrderedMap<Guid, Item> };
}
