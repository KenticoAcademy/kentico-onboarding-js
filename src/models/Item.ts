import { TypedRecord } from './TypedRecord';

export interface IItem {
  id: Guid;
  text: string;
}

const defaultValue: IItem = {id: '0', text: ''};

export class Item extends TypedRecord(defaultValue) implements IItem {
  id: Guid;
  text: string;
}

