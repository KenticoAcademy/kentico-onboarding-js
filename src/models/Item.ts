import { TypedRecord } from './TypedRecord';

export interface IItem {
  id: Guid;
  text: string;
  isEdited: boolean;
}

const defaultValue: IItem = {id: '0', text: '', isEdited: false};

export class Item extends TypedRecord(defaultValue) implements IItem {
  id: Guid;
  text: string;
  isEdited: boolean;
}

