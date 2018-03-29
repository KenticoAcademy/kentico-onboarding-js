import { key } from '../@types/key';

export interface IItem {
  readonly key: key;
  readonly value: string;
  readonly isBeingEdited: boolean;
  readonly temporaryValue: string;
}
