import { Record } from 'immutable';

const defaultItemRecord = {
  id: 0, text: '',
};

export const Item = Record(defaultItemRecord, 'ItemRecord');
