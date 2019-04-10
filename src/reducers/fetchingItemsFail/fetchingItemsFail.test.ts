import { fetchingItemsFail } from './fetchingItemsFail';
import { itemsFetchFail, requestItems } from '../../actions/listActionCreators';

describe('Fetching items fail', () => {
  const trueFalse: boolean[] = [true, false];

  trueFalse.forEach(initialState => {
    it('should return true when receive items fail', () => {
      const receiveFail = itemsFetchFail();

      const result = fetchingItemsFail(initialState, receiveFail);

      expect(result).toBeTruthy();
    });
  });

  trueFalse.forEach(initialState => {
    it('should return false when request items', () => {
      const request = requestItems();

      const result = fetchingItemsFail(initialState, request);

      expect(result).toBeFalsy();
    });
  });

  trueFalse.forEach(initialState => {
    it('invalid action shouldn\'t modify state', () => {
      const invalidAction = {
        type: 'INVALID_ACTION',
        payload: null,
      };

      const result = fetchingItemsFail(initialState, invalidAction);

      expect(result).toBe(initialState);
    });
  });
});
