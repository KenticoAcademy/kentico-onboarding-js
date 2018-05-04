import { isAddingNote } from '../../../../src/reducers/notes/list/isAddingNote';
import {
  startAddingNote,
  stopAddingNote,
} from '../../../../src/actions';
import {
  FALSE_INITIAL_STATE,
  TRUE_INITIAL_STATE
} from '../../../testUtils/mocks';

describe('Reducer isAddingNote ', () => {
  it('should working correctly with undefined state.', () => {
    const startAction = startAddingNote();
    const expectedState = true;

    const actualState = isAddingNote(undefined, startAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should not change state when UNKNOWN_ACTION is dispatched.', () => {
    const initialState = true;

    const actualState = isAddingNote(initialState, { type: 'UNKNOWN_ACTION' });

    expect(actualState).toEqual(initialState);
  });

  it('should return previous state if unknown action is dispatched.', () => {
    const unknownAction = {
      type: 'Test action',
    };
    const expectedState = false;

    const actualState = isAddingNote(FALSE_INITIAL_STATE, unknownAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should set isAddingNote to true when ADD_NOTE_FOCUS is dispatched.', () => {
    const startTouchAction = startAddingNote();
    const expectedState = true;

    const actualState = isAddingNote(FALSE_INITIAL_STATE, startTouchAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should set isAddingNote to false when ADD_NOTE_BLUR is dispatched.', () => {
    const stopTouchAction = stopAddingNote();
    const expectedState = false;

    const actualState = isAddingNote(TRUE_INITIAL_STATE, stopTouchAction);

    expect(actualState).toEqual(expectedState);
  });
});
