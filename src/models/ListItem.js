import { Record } from 'immutable';
import { defaultUuid } from '../constants/defaultUuid';

const defaultItem = {
  id: defaultUuid,
  text: '',
  isBeingEdited: false,
  selectionRangeStarts: 0,
  selectionRangeEnds: 0,
};

export const ListItem = Record(defaultItem);
