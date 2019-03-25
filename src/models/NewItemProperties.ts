import { ItemStatus } from '../reducers/interfaces/ItemStatus';
import { TypedRecord } from './TypedRecord';
import { NewItemError } from './NewItemError';

export interface INewItemProperties {
  readonly status: ItemStatus;
  readonly text: string;
  readonly error: NewItemError;
}

const emptyNewItemProperties: INewItemProperties = {
  status: ItemStatus.NothingIsHappening,
  text: '',
  error: new NewItemError(),
};

export class NewItemProperties extends TypedRecord<NewItemProperties, INewItemProperties>(emptyNewItemProperties, 'NewItemProperties') implements INewItemProperties {
  readonly status: ItemStatus;
  readonly text: string;
  readonly error: NewItemError;
}
