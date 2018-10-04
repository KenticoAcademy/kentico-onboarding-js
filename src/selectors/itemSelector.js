import memoize from 'memoizee';

export const getMemoizedIds = memoize(ids => ids.keySeq(), {
  primitive: true
});
