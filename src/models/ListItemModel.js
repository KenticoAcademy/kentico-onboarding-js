import { Record } from 'immutable';

const defaultUUID = '00000000-0000-0000-0000-000000000000';

const defaultRecord = {
  id: defaultUUID,
  text: '',
};

export const ListItemModel = Record(defaultRecord);
