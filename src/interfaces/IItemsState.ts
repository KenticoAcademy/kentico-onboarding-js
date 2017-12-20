import { OrderedMap } from 'immutable';
import { ListItem } from '../models/ListItem';

export type IItemsState = OrderedMap<string, ListItem>;
