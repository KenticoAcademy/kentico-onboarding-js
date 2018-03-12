import { default as memoize } from 'fast-memoize';

const memorized = memoize(seq => seq);
export const selectKeys = (items) => memorized(items.keySeq());
