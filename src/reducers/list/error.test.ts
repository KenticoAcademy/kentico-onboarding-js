import { error } from './error';
import {
  deleteItemSuccess,
  displayError,
  loadingItemsSuccess,
} from '../../actions/itemsActions';

describe('error', () => {
  it('initializes state with null string', () => {
    const previousState: string | undefined = undefined;
    const expectedState = null;

    const result: string | null = error(previousState, deleteItemSuccess(''));

    expect(result).toEqual(expectedState);
  });

  describe('displayError', () => {
    it('returns state with correct error message', () => {
      const errorMessage: string = 'All your bases are belong to us!';
      const previousState = null;
      const expectedState: string = errorMessage;

      const result: string | null = error(previousState, displayError(errorMessage));

      expect(result).toEqual(expectedState);
    });
  });

  describe('loadingItemsSuccess', () => {
    it('returns state with empty string', () => {
      const previousState: string = 'All your bases are belong to us!';
      const expectedState = null;

      const result: string | null = error(previousState, loadingItemsSuccess([]));

      expect(result).toEqual(expectedState);
    });
  });
});
