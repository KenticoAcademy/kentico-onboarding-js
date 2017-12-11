import { isAddingNote } from '../../../../src/reducers/notes/list/isAddingNote.ts';
import {
  startAddingNote,
  stopAddingNote,
} from '../../../../src/actions/actionCreators.ts';

describe('Reducer isAddingNote tests', () => {
  it('should return previous state if unknown action is dispatched', () => {
    const unknownAction = {
      type: 'Test action',
    };
    const expectedState = false;

    const actualState = isAddingNote(undefined, unknownAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should set isAddingNote to true when ADD_NOTE_FOCUS is dispatched', () => {
    const startTouchAction = startAddingNote();
    const expectedState = true;

    const actualState = isAddingNote(undefined, startTouchAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should set isAddingNote to false when ADD_NOTE_BLUR is dispatched', () => {
    const stopTouchAction = stopAddingNote();
    const expectedState = false;
    const mockedInitialState = true;

    const actualState = isAddingNote(mockedInitialState, stopTouchAction);

    expect(actualState).toEqual(expectedState);
  });
});
