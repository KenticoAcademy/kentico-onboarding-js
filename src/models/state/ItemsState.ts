import { OrderedMap } from 'immutable';
import { ListItem } from '../classes/ListItem';
import { Guid } from '../Guid';

export type ItemsState = OrderedMap<Guid, ListItem>;
