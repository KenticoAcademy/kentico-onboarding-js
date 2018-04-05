import { IListItem } from '../interfaces/IListItem';
import { defaultUuid } from '../../constants/defaultUuid';
import { TypedRecord } from './TypedRecord';
import { Uuid } from '../Uuid';

const defaultItem: IListItem = {
  id: defaultUuid,
  text: '',
  syncedText: '',
  isBeingEdited: false,
};

export class ListItem extends TypedRecord(defaultItem) implements IListItem {
  readonly id: Uuid;
  readonly text: string;
  readonly syncedText: string;
  readonly isBeingEdited: boolean;
}
