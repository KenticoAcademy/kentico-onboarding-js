import {
  addItemError,
  deleteItemError,
  deleteItemSuccess,
} from '../../actions/itemsActions';
import { ItemError } from '../../models/Error';
import { OrderedMap } from 'immutable';
import { IErrorsState } from '../../store/state/IErrorsState';
import { itemErrors } from './itemErrors';
import { ErrorAction } from '../../actions/types/ErrorAction';

describe('itemErrors', () => {
  it('initializes state with default Item Record value', () => {
    const previousState: IErrorsState | undefined = undefined;
    const expectedState: IErrorsState = OrderedMap();

    const result: IErrorsState = itemErrors(previousState, deleteItemSuccess('1'));

    expect(result).toEqual(expectedState);
  });

  describe('addItemError', () => {
    it('returns state with new item error', () => {
      const previousState: IErrorsState = OrderedMap();
      const message: string = 'Error message';
      const errorId: Guid = '1';
      const action: ErrorAction = ErrorAction.Add;
      const error: ItemError = new ItemError({
        id: errorId,
        message: message,
        action: action,
      });
      const expectedState: IErrorsState = OrderedMap([
        [
          errorId,
          new ItemError(error),
        ],
      ]);

      const result: IErrorsState = itemErrors(previousState, addItemError('', error));

      expect(result).toEqual(expectedState);
    });
  });

  describe('deleteItemError', () => {
    it('returns state with deleted item error', () => {
      const previousState: IErrorsState = OrderedMap([
        [
          '1',
          new ItemError({
            id: '1',
            message: 'Error1',
            action: ErrorAction.Add,
          }),
        ],
        [
          '2',
          new ItemError({
            id: '2',
            message: 'Error2',
            action: ErrorAction.Update,
          }),
        ],
      ]);
      const expectedState: IErrorsState = OrderedMap([
        [
          '2',
          new ItemError({
            id: '2',
            message: 'Error2',
            action: ErrorAction.Update,
          }),
        ],
      ]);

      const result: IErrorsState = itemErrors(previousState, deleteItemError('1'));

      expect(result.has('1')).toBeFalsy();
      expect(result).toEqual(expectedState);
    });
  });
});
