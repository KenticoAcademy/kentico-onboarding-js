import { Record } from 'immutable';

interface IItem {
  readonly id: string;
  readonly ueid: string;
  readonly value: string;
}

const defaultValues: IItem = {
  id: '',
  ueid: '',
  value: '',
};

class Item extends Record(defaultValues) implements IItem {
  readonly id: string;
  readonly ueid: string;
  readonly value: string;
}

export { Item };
