import { IListItem } from './IListItem';
import { defaultUuid } from '../constants/defaultUuid';
import { Record } from 'immutable';


const defaultItem: IListItem = {
  id: defaultUuid,
  text: '',
  isBeingEdited: false,
};

export const ListItem = Record(defaultItem);

export class ListItemClass {
  id: string;
  text: string;
  isBeingEdited: boolean;

  constructor(
    {
      id,
      text,
      isBeingEdited,
    }: {
      id: string;
      text: string;
      isBeingEdited: boolean;
    }) {
    this.id = id;
    this.text = text;
    this.isBeingEdited = isBeingEdited;
  }
}
