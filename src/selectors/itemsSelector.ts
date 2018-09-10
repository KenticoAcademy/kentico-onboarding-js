import * as memoize from 'memoizee';

export const itemsSelector = memoize((items: Array<string>) => items, { primitive: true });
