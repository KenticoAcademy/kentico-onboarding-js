import * as memoizee from 'memoizee';

export const getMemoizedIds = memoizee(
  (items: Array<Uuid>) => items,
  {
    primitive: true,
    max: 1,
  },
);
