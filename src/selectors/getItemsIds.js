import memoize from 'memoizee';

export const getItemsIds = memoize(ids => ids.keySeq(), {
  primitive: true
});
