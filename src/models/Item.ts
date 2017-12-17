import * as Immutable from 'immutable';

export interface IItem {
  readonly id: string;
  readonly text: string;
  readonly isBeingEdited: boolean;
  readonly textUpdate: string;
}

const emptyId: string = '00000000-0000-0000-0000-000000000000';

const defaultItem: IItem = {
  id: emptyId,
  text: '',
  isBeingEdited: false,
  textUpdate: '',
};

export class Item extends Immutable.Record(defaultItem) implements IItem {

  readonly id: string;
  readonly text: string;
  readonly isBeingEdited: boolean;
  readonly textUpdate: string;

  constructor(params: Partial<IItem>) {
    super(params);
  }

  with(update: Partial<IItem>) {
    return this.merge(update) as this;
  }
}
