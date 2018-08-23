import { IListItem } from '../models/ListItem';
import { OrderedMap } from 'immutable';
import * as memoize from 'memoizee';

const getArgumentsArray = (...keys: Uuid[]): Uuid[] => keys;

// Set length to false means that memoize will work with any number of arguments.
// Set max to sth means that cache size is limited.
const memoizeKeys = memoize(getArgumentsArray, {length: false, max: 1});

export const getKeys = (list: OrderedMap<Uuid, IListItem>): Uuid[] =>
  memoizeKeys(...list.keySeq().toArray().reverse());
