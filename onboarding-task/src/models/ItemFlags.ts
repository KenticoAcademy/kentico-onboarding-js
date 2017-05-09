import { Record } from 'immutable';

interface IItemFlags {
  readonly editMode: boolean;
  readonly isSavedInDatabase: boolean;
}

const defaultValues: IItemFlags = {
  editMode: false,
  isSavedInDatabase: true,
};

class ItemFlags extends Record(defaultValues) implements IItemFlags {
  readonly editMode: boolean;
  readonly isSavedInDatabase: boolean;
}

export { ItemFlags };
