const { Record } = require('immutable');

export const ListItem = new Record({
  id: undefined,
  value: '',
  isInEditMode: false
});
