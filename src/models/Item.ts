import * as Immutable from 'immutable';

export interface IItemInterface {
  new (id: string, text: string): IItem;
}

export interface IItem {
  id: string;
  text: string;
  isBeingEdited: boolean;
  textUpdate: string;
}

const emptyId: string = '00000000-0000-0000-0000-000000000000';

const defaultItem: IItem = {
  id: emptyId,
  text: '',
  isBeingEdited: false,
  textUpdate: '',
};

export const Item = Immutable.Record(defaultItem);
