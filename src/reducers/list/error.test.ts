import { error } from './error';
import { fetchFailure, deleteItem } from '../../actions/itemsActions';

describe('error', () => {
  it('initializes state with empty string', () => {
    const previousState: string | undefined = undefined;
    const expectedState: string = '';

    const result: string = error(previousState, deleteItem(''));

    expect(result).toEqual(expectedState);
  });

  describe('fetchFailure', () => {
    it('returns state with correct error message', () => {
      const errorMessage: string = 'All your bases are belong to us!';
      const previousState: string = '';
      const expectedState: string = errorMessage;

      const result: string = error(previousState, fetchFailure(errorMessage));

      expect(result).toEqual(expectedState);
    });
  });
});
