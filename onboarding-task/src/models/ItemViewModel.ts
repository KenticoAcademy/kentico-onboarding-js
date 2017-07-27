import { Item } from './Item';
import * as memoizee from 'memoizee';

export interface IItemViewModel {
  readonly id: string;
  readonly text: string;
  readonly index: number;
  readonly isEditing: boolean;
}

const ItemViewModelConstructor = (item: Item, index: number): IItemViewModel => ({
  id: item.id,
  text: item.textShown,
  index,
  isEditing: item.isEditing,
});

export const memoizedItemViewModelConstructor = memoizee(ItemViewModelConstructor);
