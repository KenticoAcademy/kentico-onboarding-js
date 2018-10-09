import {
  cancelItemUpdating,
  deleteItemError,
  deleteItemSuccess,
  postItemSuccess,
  putItemSuccess,
} from '../../actions/itemsActions';
import { ItemError } from '../../models/Error';
import { addItemErrorCreator } from '../../actions/creators/addItemErrorCreator';
import { OrderedMap } from 'immutable';
import { IErrorsState } from '../../store/state/IErrorsState';
import { itemErrors } from './itemErrors';

describe('itemErrors', () => {
  it('initializes state with default Item Record value', () => {
    const previousState: IErrorsState | undefined = undefined;
    const expectedState: IErrorsState = OrderedMap();

    const result: IErrorsState = itemErrors(previousState, deleteItemSuccess('1', ''));

    expect(result).toEqual(expectedState);
  });

  describe('addItemError', () => {
    it('returns state with new item error', () => {
      const previousState: IErrorsState = OrderedMap();
      const message: string = 'Error message';
      const idGenerator = () => '1';
      const action: ErrorAction = 'POST';
      const expectedState: IErrorsState = OrderedMap([
        [
          idGenerator(),
          new ItemError({
            id: idGenerator(),
            message,
            action,
          }),
        ],
      ]);

      const result: IErrorsState = itemErrors(previousState, addItemErrorCreator(idGenerator)('', message, action));

      expect(result).toEqual(expectedState);
    });
  });

  describe('postItemSuccess', () => {
    it('returns state deleted item error', () => {
      const previousState: IErrorsState = OrderedMap([
        [
          '1',
          new ItemError({
            id: '1',
            message: 'Error1',
            action: 'POST',
          }),
        ],
        [
          '2',
          new ItemError({
            id: '2',
            message: 'Error2',
            action: 'PUT',
          }),
        ],
      ]);
      const expectedState: IErrorsState = OrderedMap([
        [
          '2',
          new ItemError({
            id: '2',
            message: 'Error2',
            action: 'PUT',
          }),
        ],
      ]);

      const result: IErrorsState = itemErrors(previousState, postItemSuccess('42', '43', '1'));

      expect(result.has('1')).toBeFalsy();
      expect(result).toEqual(expectedState);
    });
  });

  describe('putItemSuccess', () => {
    it('returns state deleted item error', () => {
      const previousState: IErrorsState = OrderedMap([
        [
          '1',
          new ItemError({
            id: '1',
            message: 'Error1',
            action: 'POST',
          }),
        ],
        [
          '2',
          new ItemError({
            id: '2',
            message: 'Error2',
            action: 'PUT',
          }),
        ],
      ]);
      const expectedState: IErrorsState = OrderedMap([
        [
          '2',
          new ItemError({
            id: '2',
            message: 'Error2',
            action: 'PUT',
          }),
        ],
      ]);

      const result: IErrorsState = itemErrors(previousState, putItemSuccess('42', '1'));

      expect(result.has('1')).toBeFalsy();
      expect(result).toEqual(expectedState);
    });
  });

  describe('deleteItemSuccess', () => {
    it('returns state deleted item error', () => {
      const previousState: IErrorsState = OrderedMap([
        [
          '1',
          new ItemError({
            id: '1',
            message: 'Error1',
            action: 'POST',
          }),
        ],
        [
          '2',
          new ItemError({
            id: '2',
            message: 'Error2',
            action: 'PUT',
          }),
        ],
      ]);
      const expectedState: IErrorsState = OrderedMap([
        [
          '2',
          new ItemError({
            id: '2',
            message: 'Error2',
            action: 'PUT',
          }),
        ],
      ]);

      const result: IErrorsState = itemErrors(previousState, deleteItemSuccess('42', '1'));

      expect(result.has('1')).toBeFalsy();
      expect(result).toEqual(expectedState);
    });
  });

  describe('deleteItemError', () => {
    it('returns state deleted item error', () => {
      const previousState: IErrorsState = OrderedMap([
        [
          '1',
          new ItemError({
            id: '1',
            message: 'Error1',
            action: 'POST',
          }),
        ],
        [
          '2',
          new ItemError({
            id: '2',
            message: 'Error2',
            action: 'PUT',
          }),
        ],
      ]);
      const expectedState: IErrorsState = OrderedMap([
        [
          '2',
          new ItemError({
            id: '2',
            message: 'Error2',
            action: 'PUT',
          }),
        ],
      ]);

      const result: IErrorsState = itemErrors(previousState, deleteItemError('1'));

      expect(result.has('1')).toBeFalsy();
      expect(result).toEqual(expectedState);
    });
  });

  describe('cancelItemUpdating', () => {
    it('returns state deleted item error', () => {
      const previousState: IErrorsState = OrderedMap([
        [
          '1',
          new ItemError({
            id: '1',
            message: 'Error1',
            action: 'POST',
          }),
        ],
        [
          '2',
          new ItemError({
            id: '2',
            message: 'Error2',
            action: 'PUT',
          }),
        ],
      ]);
      const expectedState: IErrorsState = OrderedMap([
        [
          '2',
          new ItemError({
            id: '2',
            message: 'Error2',
            action: 'PUT',
          }),
        ],
      ]);

      const result: IErrorsState = itemErrors(previousState, cancelItemUpdating('42', '1'));

      expect(result.has('1')).toBeFalsy();
      expect(result).toEqual(expectedState);
    });
  });
});
