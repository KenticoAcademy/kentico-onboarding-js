import * as memoize from 'memoizee';

export const getItemsIds = memoize((ids: Array<Uuid>) => ids, {
  primitive: true,
});

