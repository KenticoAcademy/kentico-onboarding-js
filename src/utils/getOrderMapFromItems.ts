import { Item } from '../models/Item';
import { OrderedMap } from 'immutable';

export const getOrderMapFromItems = (items: Item[]): OrderedMap<Guid, Item> =>
  items.reduce((orderMap, item) => { return orderMap.set(item.id, item); },
               OrderedMap<Guid, Item>());
