import {
  loadingFailedFactory,
  startLoadingNotes
} from '../../../../../src/actions/thunkFactories/getNotesFactory';
import { errorId } from '../../../../../src/reducers/notes/loader/settings/errorId';

describe('Reducer errorId ', () => {
  it('should working correctly with undefined state.', () => {
    const failedLoadingAction = loadingFailedFactory(() => 'error1')('Test error');
    const expectedState = 'error1';

    const actualState = errorId(undefined, failedLoadingAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should return previous state if unknown action is dispatched', () => {
    const unknownAction = {
      type: 'Test action',
    };
    const expectedState = null;

    const actualState = errorId(null, unknownAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should set errorId when LOADING_NOTES_FAILED is dispatched.', () => {
    const failedLoadingAction = loadingFailedFactory(() => 'error1')('Test error');
    const expectedState = 'error1';
    const initialState = null;

    const actualState = errorId(initialState, failedLoadingAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should remove errorId when START_LOADING_NOTES is dispatched.', () => {
    const startLoadingAction = startLoadingNotes('error1');
    const initialState = 'error1';
    const expectedState = null;

    const actualState = errorId(initialState, startLoadingAction);

    expect(actualState).toEqual(expectedState);
  });
});
