import memoizee = require('memoizee');

import { Item } from '../models/Item';
import { ItemFlags } from '../models/ItemFlags';
import { IItemViewModel } from '../models/IItemViewModel';

const constructViewModel = (item: Item, flags: ItemFlags, index: number): IItemViewModel => ({
  id: item.id,
  value: item.value,
  isInEditMode: flags.editMode,
  isSavedInDatabase: flags.isSavedInDatabase,
  index,
});

const constructMemoizedViewModel = memoizee(constructViewModel);

export {constructViewModel, constructMemoizedViewModel};
