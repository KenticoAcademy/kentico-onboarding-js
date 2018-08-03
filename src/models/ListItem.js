import { Record } from 'immutable';

const emptyListItem = {
  id: '',
  text: '',
  isActive: false
};

export const ListItem = Record(emptyListItem, 'ListItem');
