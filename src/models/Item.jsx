import * as Immutable from 'immutable';

const emptyId = '00000000-0000-0000-0000-000000000000';

export const Item = Immutable.Record({
  id: emptyId,
  value: '',
  isBeingEdited: false,
});
