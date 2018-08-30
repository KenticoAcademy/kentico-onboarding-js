import { Record } from 'immutable';

export class ItemRecord extends Record({ id: 0, text: '', }) {
  constructor(id, text) {
    super({ id, text });
  }
}
