import * as Immutable from 'immutable';

import { Item } from '../models/Item';
import { ItemFlags } from '../models/ItemFlags';
import { ErrorMessage } from '../models/ErrorMessage';

interface IItemsState {
  items: Immutable.Map<string, Item>;
  order: Immutable.OrderedSet<string>;
  flags: Immutable.Map<string, ItemFlags>;
  isFetching: boolean;
  errors: Immutable.OrderedMap<string, ErrorMessage>;
}

export { IItemsState };
