const uuid4 = require('uuid/v4');

export const defaultItemList = [
  {
    value: 'Make a coffee',
    id: uuid4(),
    isBeingEdited: false,
  },
  {
    value: 'Master React',
    id: uuid4(),
    isBeingEdited: false,
  },
  {
    value: 'Learn Redux',
    id: uuid4(),
    isBeingEdited: false,
  },
  {
    value: 'Help making Draft awesome',
    id: uuid4(),
    isBeingEdited: false,
  },
];

