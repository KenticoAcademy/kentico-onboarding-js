import {
  IItem,
} from '../models/Item';
import memoize = require('fast-memoize');


const memoizeItem = memoize((item: IItem) => item);

export const selectItemMemoized = (item: IItem): IItem =>
  memoizeItem(item);
