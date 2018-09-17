import memoize from 'memoizee';

export const memoizedIds = memoize(ids => ids, {
  primitive: true
});
