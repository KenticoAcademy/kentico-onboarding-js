import { Record } from 'immutable';

const defaultItemRecord = {
  id: 0, text: '',
};

export const ItemRecord = Record(defaultItemRecord, 'ItemRecord');
