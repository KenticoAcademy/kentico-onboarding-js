import * as memoize from 'memoizee';

export const itemsSelector = memoize(items => items, { primitive: true });
