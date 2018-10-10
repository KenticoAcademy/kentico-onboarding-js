import { isLoading } from './isLoading';
import { deleteItemSuccess, loadingItemsSuccess } from '../../actions/itemsActions';
import { IItem, Item } from '../../models/Item';

describe('isLoading', () => {
  it('initializes state with true', () => {
    const previousState: boolean | undefined = undefined;
    const expectedState: boolean = true;

    const result: boolean = isLoading(previousState, deleteItemSuccess(''));

    expect(result).toEqual(expectedState);
  });

  describe('loadingItemsSuccess', () => {
    it('returns state with false value', () => {
      const response: IItem[] = [
        new Item({ id: '1', text: 'Text1' }),
        new Item({ id: '2', text: 'Text2' }),
      ];
      const previousState: boolean = true;
      const expectedState: boolean = false;

      const result: boolean = isLoading(previousState, loadingItemsSuccess(response));

      expect(result).toEqual(expectedState);
    });
  });
});
