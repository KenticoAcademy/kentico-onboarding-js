import { Record } from 'immutable';

export interface INote {
  readonly text: string;
  readonly id: Guid;
  readonly isEditActive: boolean;
}

const defaultNote: INote = {
  text: '',
  id: '00000000-0000-0000-0000-000000000000',
  isEditActive: false,
};

export class Note extends Record(defaultNote) implements INote {
  readonly text: string;
  readonly id: Guid;
  readonly isEditActive: boolean;

  constructor(params?: Partial<INote>) {
    params
      ? super(params)
      : super();
  }

  with(values: Partial<INote>) {
    return this.merge(values) as this;
  }
}
