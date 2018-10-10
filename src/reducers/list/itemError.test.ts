import { deleteItemSuccess } from '../../actions/itemsActions';
import { ItemError } from '../../models/Error';
import { itemError } from './itemError';
import { addItemErrorCreator } from '../../actions/creators/addItemErrorCreator';

describe('itemError', () => {
  it('initializes state with default Item Record value', () => {
    const previousState: ItemError | undefined = undefined;
    const expectedState: ItemError = new ItemError();

    const result: ItemError = itemError(previousState, deleteItemSuccess('1'));

    expect(result).toEqual(expectedState);
  });

  describe('addItemError', () => {
    it('returns new item error with error message', () => {
      const previousState: ItemError = new ItemError();
      const message: string = 'Error message';
      const idGenerator = () => '1';
      const action: ErrorAction = 'POST';
      const expectedState: ItemError = new ItemError({
        id: idGenerator(),
        message,
        action,
      });

      const result: ItemError = itemError(previousState, addItemErrorCreator(idGenerator)('', message, action));

      expect(result).toEqual(expectedState);
    });
  });
});
