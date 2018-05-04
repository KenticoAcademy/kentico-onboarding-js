import { addNoteText } from '../../../../src/reducers/notes/list/addingNoteText';
import { changeAddingNoteText } from '../../../../src/actions';

const EMPTY_STATE = '';

describe('Reducer addingNoteText ', () => {
  it('should working correctly with undefined state.', () => {
    const expectedState = 'Test';
    const addTextAction = changeAddingNoteText(expectedState);

    const actualState = addNoteText(undefined, addTextAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should not change text in the state when UNKNOWN_ACTION is dispatched.', () => {
    const expectedState = EMPTY_STATE;

    const actualState = addNoteText(EMPTY_STATE, { type: 'UNKNOWN_ACTION' });

    expect(actualState).toEqual(expectedState);
  });

  it('should replace text in the state when action ADD_NOTE_TEXT_CHANGE is dispatched.', () => {
    const expectedState = 'Test';
    const addTextAction = changeAddingNoteText(expectedState);

    const actualState = addNoteText(EMPTY_STATE, addTextAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should remove text from the state when action ADD_NOTE_TEXT_CHANGE is dispatched.', () => {
    const expectedState = EMPTY_STATE;
    const addTextAction = changeAddingNoteText(expectedState);

    const actualState = addNoteText(EMPTY_STATE, addTextAction);

    expect(actualState).toEqual(expectedState);
  });
});
