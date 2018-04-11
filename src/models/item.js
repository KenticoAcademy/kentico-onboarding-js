import { Record } from 'immutable';

import { GUID_EMPTY } from '../constants/constants';

const defaultData = {
  key: GUID_EMPTY,
  value: '',
  isBeingEdited: false,
  temporaryValue: '',
};

export const Item = Record(defaultData, 'item');
