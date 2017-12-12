import memoize from 'fast-memoize';

export const selectItemIdsMemoized = memoize((idsMap) => idsMap.keySeq());
