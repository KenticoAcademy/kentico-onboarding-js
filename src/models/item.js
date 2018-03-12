import { Record } from 'immutable';

import { getEmptyIdentifier } from '../utils/uuidService';

const defaultData = {
  key: getEmptyIdentifier(),
  value: '',
  isBeingEdited: false,
  changeableValue: '',
};

export const Item = Record(defaultData, 'item');
