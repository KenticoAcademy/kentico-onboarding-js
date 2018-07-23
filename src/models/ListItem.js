import { Record } from 'immutable';

const emptyListItem = {
  id: '',
  text: ''
};

export const ListItem = Record(emptyListItem, 'ListItem');
