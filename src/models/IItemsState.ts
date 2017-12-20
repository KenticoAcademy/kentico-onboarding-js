import { OrderedMap } from 'immutable';
import { ListItem } from './ListItem';

export type IItemsState = OrderedMap<string, ListItem>;
