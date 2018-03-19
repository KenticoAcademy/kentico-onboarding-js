import { Record } from 'immutable';

import { getEmptyIdentifier } from '../utils/uuidService';

const defaultData = {
  key: getEmptyIdentifier(),
  value: '',
  isBeingEdited: false,
  temporaryValue: '',
};

export const Item = Record(defaultData, 'item');
