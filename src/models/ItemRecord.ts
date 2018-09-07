import { Record } from 'immutable';

export interface ItemRecordInterface {
  id: string;
  text: string;
}
export class ItemRecord extends Record({id: '0', text: ''}) {
  id: string;
  text: string;
}

