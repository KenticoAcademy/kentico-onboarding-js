import * as mem from 'mem';
import { Seq } from 'immutable';

import { Key } from '../@types/Key';
import { Item } from '../models/Item';
import { IItemViewModel } from '../models/IItemViewModel';

const getViewModel = (itemValues: Item, bullet: string): IItemViewModel => ({
  ...itemValues.toJS(),
  bullet,
});
const arraySequence = (sequence: Seq.Indexed<Key>): Array<Key> => sequence.toArray();

export const getMemoizedKeys = mem(arraySequence);

export const getMemoizedValues = mem(arraySequence);

export const createMemoizedBulletItem = mem(getViewModel);
