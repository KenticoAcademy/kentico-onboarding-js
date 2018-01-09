import { OrderedMap, Seq } from 'immutable';
import { ItemId } from '../models/ItemId';
import { Item } from '../models/Item';
const memoize = require('fast-memoize');

const memoizeIds = memoize((ids: Seq.Indexed<ItemId>) => ids);

export const selectItemIdsMemoized = (idsMap: OrderedMap<ItemId, Item>): Seq.Indexed<ItemId>  =>
  memoizeIds(idsMap.keySeq());

