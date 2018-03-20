import mem from 'mem';

const memoizedKeys = mem(seq => seq);
export const selectKeys = (items) => memoizedKeys(items.keySeq());

const memoizedValues = mem(seq => seq);
export const selectItems = (items) => memoizedValues(items.valueSeq());
