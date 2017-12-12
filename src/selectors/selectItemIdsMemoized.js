import memoize from 'fast-memoize';

const memoizeIds = memoize(ids => ids);

export const selectItemIdsMemoized = idsMap => memoizeIds(idsMap.keySeq());

