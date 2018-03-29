import { IItem } from './Item';

export interface IItemViewModel extends IItem {
  readonly bullet: string;
}
