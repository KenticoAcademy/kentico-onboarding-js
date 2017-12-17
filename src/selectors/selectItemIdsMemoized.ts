import { OrderedMap, Seq } from 'immutable';
import { ItemId } from '../models/ItemId';
const memoize = require('fast-memoize');

const memoizeIds = memoize((ids: Seq.Indexed<ItemId>) => ids);

export const selectItemIdsMemoized = (idsMap: OrderedMap<ItemId, Record<ItemId, any>>): Seq.Indexed<ItemId>  =>
  memoizeIds(idsMap.keySeq());

