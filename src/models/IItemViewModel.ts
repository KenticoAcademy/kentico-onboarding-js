import { IItem } from './IItem';

export interface IItemViewModel extends IItem {
  readonly bullet: string;
}
