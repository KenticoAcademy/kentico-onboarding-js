import * as Immutable from 'immutable';

import { Item } from '../models/Item';
import { ItemFlags } from '../models/ItemFlags';
import { ErrorMessage } from '../models/ErrorMessage';

interface IAppState {
  items: Immutable.Map<string, Item>;
  itemsOrder: Immutable.OrderedSet<string>;
  itemsDisplayFlags: Immutable.Map<string, ItemFlags>;
  isFetching: boolean;
  errors: Immutable.OrderedMap<string, ErrorMessage>;
};

export { IAppState };
