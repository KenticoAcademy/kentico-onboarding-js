const { Record } = require('immutable');

export const ListItem = new Record({
  id: undefined,
  text: '',
  isInEditMode: false
});
