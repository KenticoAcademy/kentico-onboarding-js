import { TypedRecord } from './TypedRecord';

/**
 * List Item Data Model
 */
interface IListItemData {
  /** Id of item */
  readonly id: number;
  /** Value held by item */
  readonly value: string;
  /** Id representation saved in store */
  readonly localId: string;
}

const defaultValues: IListItemData = {
  id: 0,
  value: '',
  localId: '',
};

/**
 * Represents a single item in the list
 */
export class ListItemData extends TypedRecord<IListItemData>(defaultValues) implements IListItemData {
  readonly id: number;
  readonly value: string;
  readonly localId: string;
}
