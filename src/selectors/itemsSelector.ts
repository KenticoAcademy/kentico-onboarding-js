import * as memoize from 'memoizee';

export const itemsSelector: (items: Array<string>) => Array<string> = memoize((items: Array<string>) => items, { primitive: true });
