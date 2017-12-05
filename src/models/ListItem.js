import { Record } from 'immutable';
import { defaultUuid } from '../constants/defaultUuid';

const defaultItem = {
  id: defaultUuid,
  text: '',
  isBeingEdited: false,
};

export const ListItem = Record(defaultItem);
