import * as memoize from 'memoizee';

const itemsSeq = (itemsValueSeq) => itemsValueSeq;

export const itemsSelector = memoize(itemsSeq);
