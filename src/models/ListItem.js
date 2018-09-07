import { Record } from 'immutable';

const defaultListItem = {
  id: '00000000-0000-0000-0000-000000000000',
  text: '',
  isInEditMode: false
};

export const ListItem = new Record(defaultListItem, 'ListItem');
