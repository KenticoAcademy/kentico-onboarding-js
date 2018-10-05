import { error } from './error';
import { displayError, deleteItem, loadingItemsSuccess } from '../../actions/itemsActions';

describe('error', () => {
  it('initializes state with empty string', () => {
    const previousState: string | undefined = undefined;
    const expectedState: string = '';

    const result: string = error(previousState, deleteItem(''));

    expect(result).toEqual(expectedState);
  });

  describe('displayError', () => {
    it('returns state with correct error message', () => {
      const errorMessage: string = 'All your bases are belong to us!';
      const previousState: string = '';
      const expectedState: string = errorMessage;

      const result: string = error(previousState, displayError(errorMessage));

      expect(result).toEqual(expectedState);
    });
  });

  describe('loadingItemsSuccess', () => {
    it('returns state with empty string', () => {
      const previousState: string = 'All your bases are belong to us!';
      const expectedState: string = '';

      const result: string = error(previousState, loadingItemsSuccess([]));

      expect(result).toEqual(expectedState);
    });
  });
});
