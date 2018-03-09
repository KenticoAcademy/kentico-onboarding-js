import { Record } from 'immutable';

import { getEmptyIdentifier } from '../utils/uuidService';

const defaultData = {
  key: getEmptyIdentifier(),
  value: '',
};

export const ToDo = Record(defaultData, 'toDo');
