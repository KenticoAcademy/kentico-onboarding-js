import * as Immutable from 'immutable';
import { itemsErrorReducer } from '../../src/reducers/itemsErrorReducer';
import { receivePostItemErrorFactory } from '../../src/actions/receivePostItemErrorFactory';
import { receiveItemsFetchingErrorFactory } from '../../src/actions/receiveItemsFetchingErrorFactory';
import { ErrorMessage } from '../../src/models/ErrorMessage'

describe('itemsErrorReducer', () => {
  const id = 'da5cbf5f-2d20-4945-b8d2-4cc3b6be1542';
  const ueid = '2235d270-3918-48d9-95f7-a1b0ef008126';
  const message = 'error message';
  const defaultState = Immutable.OrderedMap();
  const state = Immutable.OrderedMap();
  const unknownAction = { type: 'unknown action' };

  it('undefined action returns default state', () => {
    const actualState = itemsErrorReducer(undefined, unknownAction);

    return expect(actualState).toEqual(defaultState);
  });

  it('return correct ErrorMessage after receivePostItemError action', () => {
    const error = new Error(message);
    const errorMessage = new ErrorMessage({ id, itemUeid: ueid, message });
    const stateWithErrorMessage = defaultState.set(id, errorMessage);

    const actualState = itemsErrorReducer(undefined, receivePostItemErrorFactory(() => id)(error, ueid));

    return expect(actualState).toEqual(stateWithErrorMessage);
  });

  it('return correct ErrorMessage after receiveItemsFetchingError action', () => {
    const error = new Error(message);
    const errorMessage = new ErrorMessage({ id, message });
    const stateWithErrorMessage = defaultState.set(id, errorMessage);

    const actualState = itemsErrorReducer(undefined, receiveItemsFetchingErrorFactory(() => id)(error));

    return expect(actualState).toEqual(stateWithErrorMessage);
  });
});
