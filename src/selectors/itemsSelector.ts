import * as memoize from 'memoizee';
import { OrderedMap } from 'immutable';
import { Item } from '../models/Item';

const itemsKey = (items: OrderedMap<Guid, Item>): Array<string> => {
  return items.keySeq().toArray();
};

export const itemsSelector: (items: OrderedMap<Guid, Item>) => Array<string> = memoize(itemsKey, { primitive: true });
