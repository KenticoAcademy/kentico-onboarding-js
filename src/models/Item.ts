import { Record } from 'immutable';

export class Item extends Record({id: '0', text: ''}) {
  id: Guid;
  text: string;
}

