import Immutable from 'immutable';

const emptyId = '00000000-0000-0000-0000-000000000000';

const defaultItem = {
  id: emptyId,
  text: '',
  isBeingEdited: false,
};
export const Item = Immutable.Record(defaultItem);
