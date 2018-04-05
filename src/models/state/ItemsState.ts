import { OrderedMap } from 'immutable';
import { ListItem } from '../classes/ListItem';
import { Uuid } from '../Uuid';

export type ItemsState = OrderedMap<Uuid, ListItem>;
