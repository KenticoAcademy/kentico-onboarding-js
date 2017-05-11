import * as Immutable from 'immutable';

import { deleteItem } from '../../src/actions/actionCreators';
import { itemsErrorReducer } from '../../src/reducers/itemsErrorReducer';
import { ErrorMessage } from '../../src/models/ErrorMessage';

describe('itemsErrorReducer', () => {
  const id = 'da5cbf5f-2d20-4945-b8d2-4cc3b6be1542';
  const defaultState = Immutable.OrderedMap();
  const state = Immutable.OrderedMap();
  const unknownAction = { type: 'unknown action' };

  it('undefined action returns default state', () => {
    const actualState = itemsErrorReducer(defaultState, unknownAction);

    return expect(actualState).toEqual(defaultState);
  });
});
