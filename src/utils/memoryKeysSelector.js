import mem from 'mem';

const memorized = mem(seq => seq);
export const selectKeys = (items) => memorized(items.keySeq());
