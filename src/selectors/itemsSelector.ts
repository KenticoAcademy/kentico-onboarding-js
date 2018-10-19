import * as memoize from 'memoizee';
import { IItemState } from '../reducers/board/items/items';

const itemsKey = (items: IItemState): Array<string> => items.keySeq().toArray();

export const itemsSelector: (items: IItemState) => Array<string> = memoize(itemsKey, { primitive: true });
