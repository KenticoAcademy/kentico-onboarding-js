const { Record } = require('immutable');

export const ListItem = new Record({
  id: undefined,
  inputText: '',
  isInEditMode: false
});
