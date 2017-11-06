import { generateId } from './generateId';

export const defaultItemList = [
  {
    value: 'Make a coffee',
    id: generateId(),
    isBeingEdited: false,
  },
  {
    value: 'Master React',
    id: generateId(),
    isBeingEdited: false,
  },
  {
    value: 'Learn Redux',
    id: generateId(),
    isBeingEdited: false,
  },
  {
    value: 'Help making Draft awesome',
    id: generateId(),
    isBeingEdited: false,
  },
];

