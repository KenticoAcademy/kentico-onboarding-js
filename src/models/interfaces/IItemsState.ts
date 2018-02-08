import { OrderedMap } from 'immutable';
import { ListItem } from '../classes/ListItem';
import { Guid } from '../Guid';

export type IItemsState = OrderedMap<Guid, ListItem>;
