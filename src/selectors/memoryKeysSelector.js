import mem from 'mem';

const memoized = mem(seq => seq);
export const selectKeys = (items) => memoized(items.keySeq());
