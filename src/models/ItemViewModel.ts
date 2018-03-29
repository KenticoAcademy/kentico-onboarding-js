import * as mem from 'mem';

import { Item } from './Item';
import { IItemViewModel } from './IItemViewModel';

const getViewModel = (itemValues: Item, bullet: string): IItemViewModel => ({
  ...itemValues.toJS(),
  bullet,
});

export const createMemoizedViewModel = mem(getViewModel);
