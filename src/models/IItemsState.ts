import { OrderedMap } from 'immutable';
import { ListItem } from './ListItem';
import { Guid } from './Guid';

export type IItemsState = OrderedMap<Guid, ListItem>;
