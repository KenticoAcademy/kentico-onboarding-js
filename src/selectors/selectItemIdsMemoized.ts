import { OrderedMap, Seq } from 'immutable';
const memoize = require('fast-memoize');

const memoizeIds = memoize((ids: Seq.Indexed<any>) => ids);

export const selectItemIdsMemoized = (idsMap: OrderedMap<string, Record<string, any>>): Seq.Indexed<string>  => memoizeIds(idsMap.keySeq());

