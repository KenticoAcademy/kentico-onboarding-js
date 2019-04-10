import { isFetching } from './isFetching';
import { OrderedMap } from 'immutable';
import { ListItem } from '../../models/ListItem';
import { itemsFetchSuccess, requestItems } from '../../actions/listActionCreators';

describe('IsFetching', () => {
  const trueFalse: boolean[] = [true, false];

  trueFalse.forEach(initialState => {
    it('returns true when request items', () => {
      const request = requestItems();

      const result = isFetching(initialState, request);

      expect(result).toBeTruthy();
    });
  });


  trueFalse.forEach(initialState => {
    it('returns false when receive items', () => {
      const receive = itemsFetchSuccess(OrderedMap<Uuid, ListItem>());

      const result = isFetching(initialState, receive);

      expect(result).toBeFalsy();
    });
  });

  trueFalse.forEach(initialState => {
    it('invalid action doesn\'t modify state', () => {
      const invalid = {type: 'INVALID', payload: null};

      const result = isFetching(initialState, invalid);

      expect(result).toBe(initialState);
    });
  });
});
